import { body } from "express-validator";
import { validationResult } from "express-validator";

export const recipeValidation = [
    body("title")
        .notEmpty().withMessage("Title is required"),

    body("description")
        .notEmpty().withMessage("Description is required"),

    body("instructions")
        .notEmpty().withMessage("Instructions is required"),
];

export const createRecipeValidation = [
    body("title")
        .notEmpty().withMessage("Title is required"),

    body("description")
        .notEmpty().withMessage("Description is required"),

    body("instructions")
        .notEmpty().withMessage("Instructions is required"),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};