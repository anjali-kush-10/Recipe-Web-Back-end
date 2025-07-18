import { DataTypes } from "sequelize";
import sequelize from "../db_services/connection.js";

const category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category: {
        type: DataTypes.ENUM("Dessert", "Food"),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false
    }
},
    {
        tableName: "category",
        timestamps: true
    });

export default category;