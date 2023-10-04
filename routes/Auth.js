import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UsersModel from "../UsersModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const user = await UsersModel.findOne({ username });

    if ( user ) {
        return res.json({ message: "User already exists!" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new UsersModel({
        username,
        password: hashedPass,
        mostRecentRatings: [],
        level: 1,
        hitCount: 0,
        missCount: 0,
        currHitStreak: 0,
        longestHitStreak: 0,
        highestThrowScore: 0,
        accountCreationDate: new Date(),
        currTheme: "default"
    })
    await newUser.save();

    res.json({ message: "User successfully registered" });
})

router.post("/login", async (req, res ) => {
    const {
        username,
        password
    } = req.body;

    const user = await UsersModel.findOne({ username });

    if (!user) {
        res.json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, userId: user._id });

})

export { router as authRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, err => {
            if (err) return res.sendStatus(403);
            next();
        });
    } else {
        res.send(401);
    }
}