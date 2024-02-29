"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const RoleModel = (sequealize) => {
    const Role = sequealize.define("Role", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
    Role.associate = (models) => {
        Role.hasMany(models.User);
    };
    return Role;
};
exports.default = RoleModel;
