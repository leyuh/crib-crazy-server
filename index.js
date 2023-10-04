import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import UsersModel from "./UsersModel.js";
import { authRouter } from "./routes/Auth.js";
import { userRouter } from "./routes/User.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(3001, () => {
        console.log(`Server port: 3001`);
    });

}).catch((err) => {
    console.log(err);
})