"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const role_1 = __importDefault(require("../controllers/role"));
const session_1 = require("../middlewares/session");
router.get('/', session_1.checkJwt, role_1.default.allRoles);
router.post('/', session_1.checkJwt, role_1.default.createRole);
router.get('/:id', session_1.checkJwt, role_1.default.getRole);
router.put('/:id', session_1.checkJwt, role_1.default.updateRole);
router.delete('/:id', session_1.checkJwt, role_1.default.deleteRole);
exports.default = router;
