"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SaleModel = (sequealize) => {
    const Sale = sequealize.define("Sale", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        sale_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        tax: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: true,
        },
        total: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM("VALID", "CANCELED"),
            allowNull: false,
            defaultValue: 'VALID'
        }
    }, {
        timestamps: false,
    });
    Sale.associate = (models) => {
        Sale.belongsToMany(models.Product, { through: models.SaleDetail });
        Sale.hasMany(models.SaleDetail);
        Sale.belongsTo(models.Client);
    };
    return Sale;
};
exports.default = SaleModel;
