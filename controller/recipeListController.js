import { Op } from "sequelize";
import Recipe from "../models/recipe.model.js";
import dotenv from "dotenv";
import recipe from "../models/recipe.model.js";
dotenv.config();


export const getRecipeList = async (req, res) => {
    try {
        const search = req.query.search || "";

        const findRecipes = await Recipe.findAll({
            where:{
                [Op.or]:[
                    {title:{[Op.like]:`%${search}%`}}
                ]
            },
            attributes: ['id', 'title', 'description','instructions']
        });
        if (!findRecipes) {
            return res.status(404).json({ status: false, message: "Unable to fetch Recipes details" });
        }
        else {
            return res.status(200).json({ status: true, message: "Recipes details found successfully", findRecipes });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: "Error in fetching lists of recipe" });
    }
}

export const createRecipe = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ status: false, message: "Unauthorized: No token or invalid token" });
        }

        const { title, description, instructions } = req.body;

        if (!title || !description || !instructions) {
            return res.status(400).json({ status: false, message: "Title and description are required" });
        }

        await Recipe.create({ title, description, instructions });

        return res.status(201).json({
            status: true,
            message: "New recipe created successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "IError in creating recipe"
        });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { title, description } = req.body;

        if (!user) {
            return res.status(401).json({ status: false, message: "Unauthorized: No token or invalid token" });
        }

        const findRecipe = await Recipe.findOne({
            where: {
                id: id
            }
        });
        console.log(findRecipe, "findrecipe");


        if (!findRecipe) {
            return res.status(404).json({ status: false, message: "Unable to find recipe" });
        }
        else {
            await Recipe.update(
                { title, description },
                { where: { id } }
            );
            return res.status(200).json({ status: true, message: "Recipe updated successfully" });
        }

    }
    catch (error) {
        console.error("Error in creating recipe:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}

export const deleteRecipe = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;

        if (!user) {
            return res.status(401).json({ status: false, message: "Unauthorized: No token or invalid token" });
        }

        const findRecipe = await Recipe.findOne({
            where: { id: id }
        });

        if (!findRecipe) {
            return res.status(404).json({ status: false, message: "Unable to find recipe" });
        }
        else {
            await Recipe.destroy({
                where: { id: id }
            });
            return res.status(200).json({ status: true, message: "Recipe Deleted successfully" });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
}


export const readRecipe=async(req,res)=>{
    try{
        const user = req.user;
        const {id}=req.params;

        if (!user) {
            return res.status(401).json({ status: false, message: "Unauthorized: No token or invalid token" });
        }

        const findRecipeById=await Recipe.findOne({
            where:{
                id:id
            },
            attributes:['id','title','description','instructions']
        });

        if(!findRecipeById){
            return res.status(404).json({status:false, message:"Unable to find recipe"});
        }
        else{
            return res.status(200).json({status:true, message:"Recipe found",findRecipeById});
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
}