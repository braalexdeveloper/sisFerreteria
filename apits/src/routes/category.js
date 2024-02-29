"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importar controlador
const category_1 = __importDefault(require("../controllers/category"));
const session_1 = require("../middlewares/session");
router.get('/', session_1.checkJwt, category_1.default.allCategories);
router.post('/', session_1.checkJwt, category_1.default.createCategory);
router.get('/:id', session_1.checkJwt, category_1.default.getCategory);
router.put('/:id', session_1.checkJwt, category_1.default.updateCategory);
router.delete('/:id', session_1.checkJwt, category_1.default.deleteCategory);
exports.default = router;
