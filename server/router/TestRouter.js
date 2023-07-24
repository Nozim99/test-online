import express from "express";
import multer from "multer";
import * as testController from "../controller/TestController.js";
import {protect} from "../middleware/Auth.js";

const router = express.Router();
const upload = multer({dest: "uploads/"});

router.get("/check/:name", testController.checkName);
router.get("/amount", testController.getAllTest);

router.use(protect);
router.get("/get", testController.getTests);
router.get("/name", testController.getTestByName);
router.post("/create", upload.single("image"), testController.createTest);

export default router;