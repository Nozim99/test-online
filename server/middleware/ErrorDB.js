import ErrorModel from "../model/ErrorModel.js";

const ErrorDB = async (err, route, res) => {
  console.log(`route: ${route}
  message: ${err.message}`)
  const newError = new ErrorModel({route, message: err.message});
  await newError.save();
  return res.status(500).json({message: "Internal Server Error", error: err.message})
}

export {ErrorDB};