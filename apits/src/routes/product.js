"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Directorio donde se guardarán las imágenes
const uploadDirectory = path_1.default.join(__dirname, '../uploads/products');
// Configuración de multer para almacenar archivos en el directorio de uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// Importar controlador
const product_1 = __importDefault(require("../controllers/product"));
const session_1 = require("../middlewares/session");
router.get('/', session_1.checkJwt, product_1.default.allProducts);
router.post('/', session_1.checkJwt, upload.single('image'), product_1.default.createProduct);
router.get('/:id', session_1.checkJwt, product_1.default.getProduct);
router.put('/:id', session_1.checkJwt, upload.single('image'), product_1.default.updateProduct);
router.delete('/:id', session_1.checkJwt, product_1.default.deleteProduct);
exports.default = router;
