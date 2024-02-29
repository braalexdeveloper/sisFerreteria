"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const productController = {
    allProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let products = [];
            if (req.query.textSearch) {
                // Realizar la búsqueda por nombre de producto o nombre de categoría
                products = yield db_1.models.Product.findAll({
                    include: {
                        model: db_1.models.Category,
                    },
                    where: {
                        [sequelize_1.Op.or]: [
                            {
                                name: {
                                    [sequelize_1.Op.like]: `%${req.query.textSearch}%` // Búsqueda parcial para el nombre del producto
                                }
                            },
                            {
                                '$Category.name$': {
                                    [sequelize_1.Op.like]: `%${req.query.textSearch}%` // Búsqueda parcial para el nombre de la categoría a través de la asociación
                                }
                            }
                        ]
                    }
                });
            }
            else {
                products = yield db_1.models.Product.findAll({
                    include: {
                        model: db_1.models.Category
                    }
                });
            }
            const productsFormat = products.map((el) => {
                return {
                    id: el.id,
                    name: el.name,
                    description: el.description,
                    stock: el.stock,
                    price: el.price,
                    image: el.image,
                    CategoryId: el.Category.id,
                    category: el.Category.name
                };
            });
            return res.status(200).json({
                products: productsFormat,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    getProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const product = yield db_1.models.Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: "No se encontró el Producto" });
            }
            return res.status(200).json({
                product,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    createProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let imagePath = '';
            if (req.file) {
                imagePath = "/products/" + req.file.filename;
                console.log(req.file.filename);
            }
            const { name, description, stock, price, CategoryId } = req.body;
            if (!name || !stock || !price) {
                throw "El campo name,stock y price son requeridos!";
            }
            const product = yield db_1.models.Product.create({ name, description, stock, price, image: imagePath, CategoryId });
            // Obtener el producto con su categoría asociada
            const productWithCategory = yield db_1.models.Product.findOne({
                where: { id: product.id },
                include: {
                    model: db_1.models.Category,
                },
            });
            const productFormat = {
                id: productWithCategory.id,
                name: productWithCategory.name,
                description: productWithCategory.description,
                stock: productWithCategory.stock,
                price: productWithCategory.price,
                image: productWithCategory.image,
                CategoryId: productWithCategory.Category.id,
                category: productWithCategory.Category.name
            };
            res.status(200).json({
                message: "Producto creado correctamente",
                product: productFormat,
            });
        }
        catch (error) {
            console.error("Error al crear el producto:", error);
            res.status(500).json({
                message: "Error interno al crear el producto",
                error: error,
            });
        }
    }),
    updateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, description, stock, price, CategoryId } = req.body;
            let dataProduct = {
                name,
                description,
                stock,
                price,
                CategoryId
            };
            let imagePath = '';
            if (req.file) {
                let productFound = yield db_1.models.Product.findByPk(req.params.id);
                imagePath = "/products/" + req.file.filename;
                fs_1.default.unlinkSync(path_1.default.join(__dirname, '..', 'uploads', productFound.image));
                dataProduct = Object.assign(Object.assign({}, dataProduct), { image: imagePath });
            }
            if (!name || !stock || !price) {
                throw "El campo name,stock y price son requeridos!";
            }
            // Realizar la actualización y obtener el número de filas actualizadas
            const [updatedRowCount] = yield db_1.models.Product.update(dataProduct, { where: { id: req.params.id } });
            if (updatedRowCount > 0) {
                // Si se actualizó al menos una fila, realizar una consulta para obtener el producto actualizado
                const updatedProduct = yield db_1.models.Product.findOne({
                    where: { id: req.params.id },
                    include: {
                        model: db_1.models.Category,
                    },
                });
                const productFormat = {
                    id: updatedProduct.id,
                    name: updatedProduct.name,
                    description: updatedProduct.description,
                    stock: updatedProduct.stock,
                    price: updatedProduct.price,
                    image: updatedProduct.image,
                    CategoryId: updatedProduct.Category.id,
                    category: updatedProduct.Category.name
                };
                res.status(200).json({
                    message: "Producto actualizado correctamente",
                    product: productFormat,
                });
            }
            else {
                res.status(404).json({
                    message: "No se encontró el producto para actualizar",
                });
            }
        }
        catch (error) {
            console.error("Error al actualizar el producto:", error);
            res.status(500).json({
                message: "Error interno al actualizar el producto",
                error: error.message,
            });
        }
    }),
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield db_1.models.Product.findByPk(req.params.id);
            yield db_1.models.Product.destroy({ where: { id: req.params.id } });
            if (product.image) {
                fs_1.default.unlinkSync(path_1.default.join(__dirname, '..', 'uploads', product.image));
            }
            res.status(200).json({
                message: "Producto eliminado correctamente",
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Error interno al eliminar el producto",
                error: error.message,
            });
        }
    }),
};
exports.default = productController;
