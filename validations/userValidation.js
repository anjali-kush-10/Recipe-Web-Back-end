import { body } from "express-validator";
import { validationResult } from "express-validator";

export const userValidation = [
    body("name")
        .notEmpty().withMessage("Name is required"),

    body("phone")
        .notEmpty().withMessage("Phone number is required").isLength({ min: 10, max: 10 })
        .isMobilePhone().withMessage("Invalid phone number"),

    body("address")
        .notEmpty().withMessage("Address is required"),
];

export const loginValidation = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email"),
];

export const verifyOtpValidation = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email"),

    body("otp")
        .notEmpty().withMessage("OTP is required")
        .isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 characters"),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};