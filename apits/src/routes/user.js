"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadDirectory = path_1.default.join(__dirname, '../uploads/users');
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
const user_1 = __importDefault(require("../controllers/user"));
const session_1 = require("../middlewares/session");
router.get('/', session_1.checkJwt, user_1.default.allUsers);
router.post('/', session_1.checkJwt, upload.single('avatar'), user_1.default.createUser);
router.get('/:id', session_1.checkJwt, user_1.default.getUser);
router.put('/:id', session_1.checkJwt, upload.single('avatar'), user_1.default.updateUser);
router.delete('/:id', session_1.checkJwt, user_1.default.deleteUser);
exports.default = router;
