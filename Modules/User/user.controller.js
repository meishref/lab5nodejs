import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { UserModel } from "../../Database/Models/User/user.model.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { confirmEmailTemplate } from "../../utils/emailTemplate.js";

export const signup = async (req, res, next) => {
    try {
        const exist = await UserModel.findOne({ email: req.body.email });
        if (exist)
            return res.status(409).json({ message: "Email already exists" });

        const hashed = await bcrypt.hash(req.body.password, 10);

        const token = crypto.randomBytes(32).toString("hex");

        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            confirmEmailToken: token
        });

        const confirmLink = `http://localhost:3000/confirm-email/${token}`;

        await sendEmail({
            to: user.email,
            subject: "Confirm Your Email ✔",
            html: confirmEmailTemplate(user.name, confirmLink)
        });

        res.status(201).json({
            message: "Signup successful, check your email to confirm account"
        });
    } catch (err) {
        next(err);
    }
};

export const confirmEmail = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ confirmEmailToken: req.params.token });

        if (!user)
            return res.status(400).json({ message: "Invalid token" });

        user.isConfirmed = true;
        user.confirmEmailToken = undefined;
        await user.save();

        res.json({ message: "Email confirmed successfully 🎉" });
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user)
        return res.status(401).json({ message: "Invalid email" });

    if (!user.isConfirmed)
        return res.status(403).json({ message: "Please confirm your email first" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
        return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secretKey");
    res.json({ token });
};