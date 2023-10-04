import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { verifyToken } from "./Auth.js";
import UsersModel from "../UsersModel.js";

const router = express.Router();

router.put("/new-rating", verifyToken, async (req, res) => {
    const {
        _id,
        newRating
    } = req.body;

    try {
        const user = await UsersModel.findOne({ _id });
        if (user.mostRecentRatings.length >= 50) user.mostRecentRatings.shift();
        user.mostRecentRatings.push(newRating);
        await user.save();

        const result = await UsersModel.find({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
})

router.put("/update-lvl", verifyToken, async (req, res) => {
    const {
        _id,
        amount
    } = req.body;

    try {
        const user = await UsersModel.findOne({ _id });
        user.level = Math.round((user.level + amount) * 100) / 100;
        await user.save();

        const result = await UsersModel.find({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
})

router.put("/update-hit-miss-count", verifyToken, async (req, res) => {
    const {
        _id,
        isHit
    } = req.body;

    try {
        const user = await UsersModel.findOne({ _id });
        if (isHit) {
            user.hitCount++;
        } else {
            user.missCount++;
        }
        await user.save();

        const result = await UsersModel.find({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
})

router.put("/update-hit-streak", verifyToken, async (req, res) => {
    const {
        _id,
        isHit
    } = req.body;

    try {
        const user = await UsersModel.findOne({ _id });
        if (isHit) {
            user.currHitStreak++;
            user.longestHitStreak = Math.max(user.currHitStreak, user.longestHitStreak);
        } else {
            user.currHitStreak = 0;
        }
        await user.save();

        const result = await UsersModel.find({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
})

router.put("/update-highest-throw-score", verifyToken, async (req, res) => {
    const {
        _id,
        throwScore
    } = req.body;

    try {
        const user = await UsersModel.findOne({ _id });
        user.highestThrowScore = Math.max(throwScore, user.highestThrowScore);
        await user.save();

        const result = await UsersModel.find({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
})

router.put("/set-curr-theme", verifyToken, async (req, res) => {
    const {
        _id,
        theme
    } = req.body;

    try {
        const user = await UsersModel.findOne({ _id });
        user.currTheme = theme;
        await user.save();

        const result = await UsersModel.find({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
})


router.get("/", async (req, res) => {
    try {
        const result = await UsersModel.find({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
})


export { router as userRouter };