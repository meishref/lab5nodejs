import jwt from "jsonwebtoken";
const userController = require('../Modules/User/user.controller.js');
const userRoutes = require('../Modules/User/user.routes.js');

export const userMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: "Token required" });

    jwt.verify(token, "secretKey", (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.userId = decoded.id;
        next();
    });
};
