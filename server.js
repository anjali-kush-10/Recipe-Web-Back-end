import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { adminRouter } from "./routes/userListRoute.js";
import { recipeRouter } from "./routes/recipeListRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', adminRouter());
app.use('/recipe', recipeRouter());

app.listen(PORT);
console.log("Server invoked at this port", PORT);
