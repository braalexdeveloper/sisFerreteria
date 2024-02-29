"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ClientModel = (sequealize) => {
    const Client = sequealize.define("Client", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ruc: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Client;
};
exports.default = ClientModel;
