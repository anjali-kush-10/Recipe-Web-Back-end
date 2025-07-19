import express from "express";
import { completeProfile, deleteProfile, Login, verifyOtp, getUserList } from "../controller/userListController.js";
import { authMiddleware } from "../utils/authJwtMiddleware.js";
import { loginValidation, userValidation, validate, verifyOtpValidation } from "../validations/userValidation.js";

const router = express.Router();

export const adminRouter = () => {

    router.get("/get-user-list", authMiddleware, getUserList);


    router.post("/login", loginValidation, validate, Login);
    router.post("/verify-otp", verifyOtpValidation, validate, verifyOtp);
    router.post("/complete-profile",authMiddleware, userValidation, validate,  completeProfile);

    router.delete("/delete-profile/:id", authMiddleware, deleteProfile);


    return router;
}