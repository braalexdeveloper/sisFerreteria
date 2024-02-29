"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importar controlador
const client_1 = __importDefault(require("../controllers/client"));
const session_1 = require("../middlewares/session");
router.get('', session_1.checkJwt, client_1.default.allClients);
router.post('', session_1.checkJwt, client_1.default.createClient);
router.put('/:id', session_1.checkJwt, client_1.default.updateClient);
router.delete('/:id', session_1.checkJwt, client_1.default.deleteClient);
exports.default = router;
