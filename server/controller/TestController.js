import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";
import Test from "../model/TestModel.js";
import fs from "fs";
import {ErrorDB} from "../middleware/ErrorDB.js";
import {testValidation} from "../utils/testUtils.js";
import bcrypt from "bcrypt";

const isValidObjectId = mongoose;

// * Create test
// * POST /test/create
const createTest = async (req, res) => {
  try {
    const {name, password} = req.body;
    const isPrivate = JSON.parse(req.body.isPrivate);
    const test = JSON.parse(req.body.test);
    const image = req.file;

    if (!name) return res.status(400).json({error: "Nomini kiriting"});
    if (name.length < 3) return res.status(400).json({error: "Testni nomidagi belgi kamida 3 ta bo'lishi kerak"});
    if (!test || !test.length) return res.status(400).json({error: "Test kiritilmagan"});
    // if (!testValidation(test)) return res.status(400).json({error: "Test to'liq to'ldirilmagan"});
    if (isPrivate && password.length < 3) return res.status(400).json({error: "Parol kamida 3 ta belgidan iborat bo'lishi kerak"});

    const isNameEmpty = await Test.findOne({name: {$regex: new RegExp(`^${name}$`), $options: "i"}})
    if (isNameEmpty) return res.status(400).json({error: "Bu nom band"});

    let testImage = null;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image.path);
      testImage = uploadedImage.secure_url;
      fs.unlinkSync(image.path);
    }
    let hashPassword = null;
    if (isPrivate) {
      hashPassword = await bcrypt.hash(password, 10);
    }


    const createTest = await Test.create({
      name,
      image: testImage,
      test,
      isPrivate,
      password: hashPassword,
      createdBy: req.user._id,
    })

    res.json(createTest);
  } catch (err) {
    ErrorDB(err, "POST /test", res);
  }
}

// * test
// * DELETE /test/:id
const deleteTest = async (req, res) => {
  try {
    const id = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({error: "id raqamini kiriting"});

    const test = await Test.findById(id);
    if (!test) return res.status(400).json({error: "Test mavjud emas"});
    if (!test.createdBy.equal(req.user._id)) return res.status(400).json({erro: "Siz bu testni o'chiraolmaysiz"});

    // delete test
    Test.findByIdAndRemove(id)
      .then((result) => {
        return res.json(result);
      })
  } catch (err) {
    ErrorDB(err, "DELETE /test/:id", res);
  }
}

// * Edit test
// * PUT /test/edit
const edit = async (req, res) => {
  try {
    const {test, id} = req.body;

    if (!isValidObjectId(id)) return res.status(400).json({error: "id raqamini kiriting"});
    if (!testValidation(test)) return res.status(400).json({error: "Testni to'liq to'ldiring"});

    const foundTest = await Test.findById(id);

    if (!foundTest) return res.status(400).json({error: "Test topilmadi"});
    if (!foundTest.createdBy.equal(req.user._id)) return res.status(400).json({error: "Siz bu testni o'zgartira olmaysiz"});

    foundTest.test = test;
    await foundTest.save();

    res.json({test: foundTest.test});
  } catch (err) {
    ErrorDB(err, "PUT /test/edit", res);
  }
}

// * Add user
// * PUT /test/add/user
const addUser = async (req, res) => {
  const {result, answers, testId} = req.body;
  if (!result || !answers) return res.status(400).json({error: "Ma'lumot to'liq yuborilmadi"});
  if (!answers.length) return res.status(400).josn({error: "Kamida 1 ta test ishlangan bo'lishi kerak"});
  if (result < 0 || result > answers.length) return res.status(400).json({error: "Natija noto'g'ri kiritildi"});
  answers.forEach((item, index) => {
    if (!["A", "B", "C", "D"].includes(item)) return res.status(400).json({error: `Xato javob! ${index + 1}: ${item}`});
  });
  if (!isValidObjectId(testId)) return res.status(400).json({error: "Testni id raqamini kiriting"});

  const test = await Test.findById(testId);

  if (!test) return res.status(400).json({error: "Bu test mavjud emas"});

  test.users.push({
    userId: req.user._id,
    result,
    answers,
  })

  await test.save();
  res.json(test);
}

// * Check test name
// * GET /test/check
const checkName = (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);
    Test.findOne({name: {$regex: new RegExp(`^${name}$`), $options: "i"}})
      .then((result) => {
        res.json({isEmpty: result ? false : true, name});
      })
  } catch (err) {
    ErrorDB(err, "GET /test/check", res);
  }
}

// * Amount of tests
// * GET /test/amount
const getAllTest = (req, res) => {
  try {
    Test.find()
      .then((result) => {
        res.json(result.length);
      })
  } catch (err) {
    ErrorDB(err, "GET /test/amount", res);
  }
}

// * Get tests
// * GET /test/get
const getTests = async (req, res) => {
  try {
    const {limit, name} = req.query;
    const decodedName = name ? decodeURIComponent(name) : "";

    const test = await Test.find({name: {$regex: decodedName, $options: "i"}});

    const testLength = test.length;
    Test.find({name: {$regex: decodedName, $options: "i"}})
      .populate("createdBy", "name")
      .select("-password -test")
      .limit(limit || 20)
      .then((result) => {
        const newResult = result.map((item) => ({
          createdBy: item.createdBy,
          image: item.image,
          isPrivate: item.isPrivate,
          name: item.name,
          users: item.users ? item.users.length : 0,
          _id: item._id,
        }))

        const myTests = newResult.filter((item) => (
          item.createdBy.equals(req.user._id)
        ));
        const otherTests = newResult.filter((item) => (
          !item.createdBy.equals(req.user._id)
        ));

        return res.json({amount: testLength, currentAmount: result.length, myTests, otherTests});
      })
  } catch (err) {
    ErrorDB(err, "GET /test/get", res)
  }
}

// * Get test by id
// * GET /test/name
const getTestByName = async (req, res) => {
  try {
    const {name, password} = req.query;
    const decoded = decodeURIComponent(name);

    const test = await Test.findOne({name: {$regex: new RegExp(`^${decoded}$`), $options: "i"}})
    if (!test) return res.status(400).json({error: `${decoded} nomli test topilmadi`});

    if (test.isPrivate) {
      const decodedPassword = decodeURIComponent(password)
      if (!password) return res.status(400).json({error: "Parol kiritilmagan"});
      const compared = await bcrypt.compare(decodedPassword, test.password);
      if (!compared) return res.status(400).json({error: "Parol xato"});
    }

    res.json({_id: test._id, name: test.name, test: test.test});
  } catch(err){
    ErrorDB(err, "GET /test/name", res)
  }
}

export {createTest, deleteTest, edit, checkName, getAllTest, getTests, getTestByName};