"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ProductModel = (sequelize) => {
    const Product = sequelize.define("Product", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    });
    Product.associate = (models) => {
        Product.belongsTo(models.Category);
        Product.belongsToMany(models.Sale, { through: models.SaleDetail });
    };
    return Product;
};
exports.default = ProductModel;
