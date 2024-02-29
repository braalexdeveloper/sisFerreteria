"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SaleDetailModel = (sequealize) => {
    const SaleDetail = sequealize.define("SaleDetail", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        discount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true,
        },
        subTotal: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        }
    }, {
        timestamps: false,
    });
    return SaleDetail;
};
exports.default = SaleDetailModel;
