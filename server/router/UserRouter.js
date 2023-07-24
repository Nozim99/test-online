import express from "express";
import multer from "multer";
import * as UserController from "../controller/UserController.js";
import { protect } from "../middleware/Auth.js";

const router = express.Router();
const upload = multer({dest: "uploads/"});

router.get("/check/:name", UserController.checkUserName);
router.get("/amount", UserController.amountUsers);
router.post("", upload.single("image"), UserController.createUser);
router.post("/login", UserController.login);

router.use(protect);
router.patch("/image", upload.single("image"), UserController.changeImage);

export default router;