import express from "express";
import { authMiddleware } from "../utils/authJwtMiddleware.js";
import { createRecipe, deleteRecipe, getRecipeList, readRecipe, updateRecipe } from "../controller/recipeListController.js";
import { createRecipeValidation, validate } from "../validations/recipeValidation.js";

const router = express.Router();

export const recipeRouter = () => {

    router.get("/get-receipe-list", authMiddleware ,getRecipeList);
    router.get("/read-recipe/:id",authMiddleware,readRecipe);

    router.post("/create-recipe", authMiddleware,createRecipeValidation,validate, createRecipe);

    router.patch("/update-recipe/:id", authMiddleware, updateRecipe);

    router.delete("/delete-recipe/:id", authMiddleware, deleteRecipe);

    return router;
}