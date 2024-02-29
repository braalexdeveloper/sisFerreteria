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
const { User, Role } = db_1.models;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const userController = {
    allUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield User.findAll({ include: Role });
            return res.status(200).json({
                users,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "No se encontró el user" });
            }
            return res.status(200).json({
                user,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }),
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password, RoleId } = req.body;
            let passHash = yield (0, bcrypt_handle_1.encrypt)(password);
            let pathAvatar = '';
            if (req.file) {
                pathAvatar = '/users/' + req.file.filename;
            }
            const user = yield User.create({ name, email, password: passHash, image: pathAvatar, RoleId });
            // Obtener el usuario recién creado incluyendo su rol asociado
            const userWithRole = yield User.findByPk(user.id, { include: Role });
            res.status(200).json({
                message: "User creado correctamente",
                user: userWithRole,
            });
        }
        catch (error) {
            console.error("Error al crear el user:", error);
            res.status(500).json({
                message: "Error interno al crear el user",
                error: error.message,
            });
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password || '',
                RoleId: req.body.RoleId
            };
            if (!user.password) {
                delete user.password;
            }
            let imagePath = '';
            if (req.file) {
                let userFound = yield User.findByPk(req.params.id);
                if (userFound.image) {
                    fs_1.default.unlinkSync(path_1.default.join(__dirname, '..', 'uploads', userFound.image));
                }
                imagePath = "/users/" + req.file.filename;
                user = Object.assign(Object.assign({}, user), { image: imagePath });
            }
            // Realizar la actualización y obtener el número de filas actualizadas
            const [updatedRowCount] = yield User.update(user, { where: { id: req.params.id } });
            if (updatedRowCount > 0) {
                // Si se actualizó al menos una fila, realizar una consulta para obtener el usero actualizado
                const updateduser = yield User.findByPk(req.params.id, { include: Role });
                res.status(200).json({
                    message: "user actualizado correctamente",
                    user: updateduser,
                });
            }
            else {
                res.status(404).json({
                    message: "No se encontró el user para actualizar",
                });
            }
        }
        catch (error) {
            console.error("Error al actualizar el user:", error);
            res.status(500).json({
                message: "Error interno al actualizar el user",
                error: error.message,
            });
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield User.destroy({ where: { id: req.params.id } });
            res.status(200).json({
                message: "user eliminado correctamente",
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Error interno al eliminar el user",
                error: error.message,
            });
        }
    }),
};
exports.default = userController;
