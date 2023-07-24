import bcrypt from "bcrypt";
import User from "../model/UserModel.js";
import {generateToken} from "../middleware/Auth.js";
import {v2 as cloudinary} from "cloudinary";
import {ErrorDB} from "../middleware/ErrorDB.js";
import fs from "fs";

// * desc Create user
// * route POST /user
const createUser = async (req, res) => {
  try {
    const {name, password} = req.body;
    let userImage = req.file;
    if (!name) return res.status(400).json({error: "Ismingizni kiriting"});
    if (!password) return res.status(400).json({error: "Parolni kiriting"});
    if (name.length < 2) return res.status(400).json({error: "Ismning belgisi 2 tadan kam bo'lmasligi kerak"});
    if (name[0] === " ") return res.status(400).json({error: "Ismni boshida bo'sh joy bo'lmasligi kerak"});

    const user = await User.findOne({name: {$regex: name, $options: "i"}});
    if (user) return res.status(400).json({error: "Bu ism mavjud"});

    const hashedPassword = await bcrypt.hash(password, 10);

    let image;
    if (userImage) {
      image = await cloudinary.uploader.upload(userImage.path)
    }

    const newUser = await User.create({
      name,
      password: hashedPassword,
      image: image ? image.secure_url : null,
      authType: "ghost",
    })

    image ? fs.unlinkSync(userImage.path) : "";

    res.status(201).json({
      name,
      image: newUser.image,
      token: generateToken(newUser._id)
    })
  } catch (err) {
    ErrorDB(err, "POST /user", res);
  }
}

// * desc Check user name
// * route GET /user/check/:name
const checkUserName = (req, res) => {
  try {
    const {name} = req.params;
    const decodeName = decodeURIComponent(name.trim());
    User.findOne({name: {$regex: new RegExp(`^${decodeName}$`, "i")}})
      .then((user) => {
        if (user) return res.json({isEmpty: false, name: decodeName});
        return res.json({isEmpty: true, name: decodeName});
      })

  } catch (err) {
    ErrorDB(err, "GET /user/check/:name", res);
  }
}

// * desc Login
// * route POST /user/login
const login = async (req, res) => {
  try {
    const {name, password} = req.body;
    if (!name) return res.status(400).json({error: "Ismingizni kiriting"});
    if (!password) return res.status(400).json({error: "Parolni kiriting"});

    const user = await User.findOne({name: {$regex: new RegExp(`^${name}$`), $options: "i"}});
    if (!user) return res.status(400).json({error: "Ism yoki parol xato kiritildi!"});

    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) return res.status(400).json({error: "Ism yoki parol xato kiritldi!"});

    const token = generateToken(user._id);

    res.json({token, name: user.name, image: user.image});
  } catch (err) {
    ErrorDB(err, "POST /user/login", res);
  }
}

// * desc Get amount of users
// * route Get /user/amount
const amountUsers = (req, res) => {
  try {
    User.find()
      .then((result) => {
        res.json({amount: result.length});
      })
  } catch (error) {
    ErrorDB(err, "GET /user/amount", res);
  }
}

// * desc Change image
// * route PATCH /user/image
const changeImage = async (req, res) => {
  try {
    const userImage = req.file;
    let image = null;
    if (userImage) {
      const uploadedImage = await cloudinary.uploader.upload(userImage.path);
      image = uploadedImage.secure_url;
      fs.unlinkSync(userImage.path);
    }

    // delete old image from cloudinary
    if (req.user.image) {
      cloudinary.uploader.destroy(req.user.image);
    }

    req.user.image = image;
    await req.user.save();
    res.json({image: req.user.image});
  } catch (err) {
    ErrorDB(err, "PATCH /user/image", res);
  }
}

export {
  createUser,
  checkUserName,
  login,
  amountUsers,
  changeImage,
}