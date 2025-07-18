import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false, // ✅ Turn off SQL logs
});


sequelize.authenticate().then((response) => {
    console.log("DB Connected successfully");

}).catch((error) => {
    console.log("Unable to connect database", error);
});

export default sequelize;