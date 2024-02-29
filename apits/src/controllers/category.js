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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const { Category } = db_1.models;
const categoryController = {
    allCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield Category.findAll();
            return res.status(200).json({
                categories,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    getCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const category = yield Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: "No se encontró la categoría" });
            }
            return res.status(200).json({
                category,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    createCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body.name) {
                throw "El campo nombre es obligatorio";
            }
            const category = yield Category.create(req.body);
            res.status(200).json({
                message: "Categoría creada correctamente",
                category,
            });
        }
        catch (error) {
            console.error("Error al crear la categoría:", error);
            res.status(500).json({
                message: "Error interno al crear la categoría",
                error: error.message,
            });
        }
    }),
    updateCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Realizar la actualización y obtener el número de filas actualizadas
            const [updatedRowCount] = yield Category.update(req.body, { where: { id: req.params.id } });
            if (updatedRowCount > 0) {
                // Si se actualizó al menos una fila, realizar una consulta para obtener la categoría actualizada
                const updatedCategory = yield Category.findByPk(req.params.id);
                res.status(200).json({
                    message: "Categoría actualizada correctamente",
                    category: updatedCategory,
                });
            }
            else {
                res.status(404).json({
                    message: "No se encontró la categoría para actualizar",
                });
            }
        }
        catch (error) {
            console.error("Error al actualizar la categoría:", error);
            res.status(500).json({
                message: "Error interno al actualizar la categoría",
                error: error.message,
            });
        }
    }),
    deleteCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Category.destroy({ where: { id: req.params.id } });
            res.status(200).json({
                message: "Categoría eliminada correctamente",
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Error interno al eliminar la categoría",
                error: error.message,
            });
        }
    }),
};
exports.default = categoryController;
