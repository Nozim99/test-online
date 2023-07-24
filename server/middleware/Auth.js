import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

export const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_KEY, {
    expiresIn: "7d",
  })
}

export const protect = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      token = req.headers.authorization.split(" ")[1];
      if(!token) return res.status(400).json({error: "Token is not available"});
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findById(decoded.id);
      next();
    }catch(err){
      console.log(err.message);
    }
  } else {
    res.status(400).json({error: "Ro'yhatdan o'tmagansiz"})
  }
}

