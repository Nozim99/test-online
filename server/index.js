import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db.js";
import cloudinaryConfig from "./config/cloudinary.js";
import UserRouter from "./router/UserRouter.js";
import TestRouter from "./router/TestRouter.js";

const app = express();

// configuration
dotenv.config();
app.use(cors());
app.use(express.json());
cloudinaryConfig();

// Connect database
connectDB();

// Routers
app.use("/user", UserRouter);
app.use("/test", TestRouter);


app.listen(process.env.PORT, ()=>console.log(`Server has been started. http://localhost:${process.env.PORT}`))
