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
const { Client } = db_1.models;
const sequelize_1 = require("sequelize");
const clientController = {
    allClients: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { textSearch } = req.query;
            let clients;
            if (textSearch) {
                clients = yield Client.findAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { dni: textSearch },
                            { ruc: textSearch }
                        ]
                    }
                });
            }
            else {
                clients = yield Client.findAll();
            }
            return res.status(200).json({
                clients
            });
        }
        catch (error) {
            return res.status(500).json({
                error
            });
        }
    }),
    createClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, lastName, dni, address, email, phone, ruc } = req.body;
            if (!name || !lastName || !dni || !address || !email || !phone) {
                return res.status(400).json({
                    error: "Solo el campo ruc no es obligatorio!"
                });
            }
            let client = {
                name,
                lastName,
                dni,
                address,
                email,
                phone,
                ruc
            };
            let newClient = yield Client.create(client);
            return res.status(201).json({
                message: "Cliente creado correctamente!",
                client: newClient
            });
        }
        catch (error) {
            return res.status(500).json({
                error
            });
        }
    }),
    updateClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, lastName, dni, address, email, phone, ruc } = req.body;
            if (!name || !lastName || !dni || !address || !email || !phone) {
                return res.status(400).json({
                    error: "Solo el campo ruc no es obligatorio!"
                });
            }
            let client = {
                name,
                lastName,
                dni,
                address,
                email,
                phone,
                ruc
            };
            const [updatedRowCount] = yield Client.update(client, { where: { id: req.params.id } });
            if (updatedRowCount > 0) {
                const updatedClient = yield Client.findByPk(req.params.id);
                res.status(200).json({
                    message: "Cliente actualizado correctamente",
                    client: updatedClient,
                });
            }
            else {
                res.status(404).json({
                    message: "No se encontró el cliente para actualizar",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                error
            });
        }
    }),
    deleteClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Client.destroy({ where: { id: req.params.id } });
            res.status(200).json({
                message: "Cliente eliminado correctamente",
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Error interno al eliminar la categoría",
                error,
            });
        }
    })
};
exports.default = clientController;
