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
const { Role } = db_1.models;
const roleController = {
    allRoles: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roles = yield Role.findAll();
            return res.status(200).json({
                message: "success",
                roles
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    createRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body.name) {
                return res.status(400).json({ error: "El campo nombre es requerido" });
            }
            let role = yield Role.create(req.body);
            return res.status(200).json({
                message: "Rol creado correctamente!",
                role
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    getRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const role = yield Role.findByPk(id);
            if (!role) {
                return res.status(404).json({ error: "No se encontró la categoría" });
            }
            return res.status(200).json({
                role,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    updateRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Realizar la actualización y obtener el número de filas actualizadas
            const [updatedRowCount] = yield Role.update(req.body, { where: { id: req.params.id } });
            if (updatedRowCount > 0) {
                // Si se actualizó al menos una fila, realizar una consulta para obtener la categoría actualizada
                const updatedRole = yield Role.findByPk(req.params.id);
                res.status(200).json({
                    message: "Rol actualizada correctamente",
                    role: updatedRole,
                });
            }
            else {
                res.status(404).json({
                    message: "No se encontró la Rol para actualizar",
                });
            }
        }
        catch (error) {
            console.error("Error al actualizar el rol:", error);
            res.status(500).json({
                message: "Error interno al actualizar el rol",
                error: error.message,
            });
        }
    }),
    deleteRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Role.destroy({ where: { id: req.params.id } });
            res.status(200).json({
                message: "Role eliminada correctamente",
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Error interno al eliminar el rol",
                error: error.message,
            });
        }
    }),
};
exports.default = roleController;
