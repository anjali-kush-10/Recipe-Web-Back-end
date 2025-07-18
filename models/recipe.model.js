import { DataTypes } from "sequelize";
import sequelize from "../db_services/connection.js";

const recipe = sequelize.define("recipe", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructions: {
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
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
    }
},
    {
        tableName: "recipe",
        timestamps: true,
        paranoid: true
    });

export default recipe;