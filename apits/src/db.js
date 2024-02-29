"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.conn = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./utils/config/index"));
const { dbUser, dbPassword, dbHost, dbName, dbPort } = index_1.default;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Instancia de Sequelize
const sequelize = new sequelize_1.Sequelize({
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: 'mysql',
    port: dbPort
});
exports.conn = sequelize;
// Cargar modelos automáticamente
const modelsDir = path_1.default.join(__dirname, 'models');
const models = {};
exports.models = models;
fs_1.default.readdirSync(modelsDir).forEach((file) => {
    const modelPath = path_1.default.join(modelsDir, file);
    const modelName = file.replace(/\.ts$/, ''); // Elimina la extensión ".ts" para obtener el nombre del modelo
    const model = require(modelPath).default; // Asegúrate de obtener la propiedad default
    models[modelName] = model(sequelize);
});
// Configurar relaciones
Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});
