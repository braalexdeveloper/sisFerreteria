"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importar controlador
const sale_1 = __importDefault(require("../controllers/sale"));
router.get('', sale_1.default.allSales);
router.get('/:id', sale_1.default.getSale);
router.post('', sale_1.default.createSale);
exports.default = router;
