import jwt from "jsonwebtoken";
import users from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token, "tokentoken");

        if (!token)
            return res.status(401).json({ status: false, message: "unauthorized" });


        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: "Unauthorized", error: error.message });
    }
}


