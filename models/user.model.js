import { DataTypes } from "sequelize";
import sequelize from "../db_services/connection.js";

const users = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("Admin", "User"),
        defaultValue: "User",
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
        tableName: "users",
        timestamps: true
    });

export default users;