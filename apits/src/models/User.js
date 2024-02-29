"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const UserModel = (sequealize) => {
    const User = sequealize.define("User", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: null
        }
    }, {
        timestamps: false,
    });
    User.associate = (models) => {
        User.belongsTo(models.Role);
    };
    return User;
};
exports.default = UserModel;
