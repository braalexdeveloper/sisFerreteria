"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Importación de rutas
const product_1 = __importDefault(require("./routes/product"));
const category_1 = __importDefault(require("./routes/category"));
const role_1 = __importDefault(require("./routes/role"));
const user_1 = __importDefault(require("./routes/user"));
const client_1 = __importDefault(require("./routes/client"));
const sale_1 = __importDefault(require("./routes/sale"));
const auth_1 = require("./routes/auth");
// Configurar CORS
app.use((0, cors_1.default)());
// Middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Definir la ruta para servir archivos estáticos (imágenes)
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/auth', auth_1.router);
app.use('/products', product_1.default);
app.use('/categories', category_1.default);
app.use('/roles', role_1.default);
app.use('/users', user_1.default);
app.use('/clients', client_1.default);
app.use('/sales', sale_1.default);
// Se exporta el router en lugar de la app directamente
exports.default = app;
