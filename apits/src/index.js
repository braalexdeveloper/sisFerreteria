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
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
const index_1 = __importDefault(require("./utils/config/index"));
const bcryptjs_1 = require("bcryptjs");
// Sincronizar modelos con la base de datos
db_1.conn.sync({ force: false })
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // Lógica adicional después de la sincronización si es necesario
    console.log('Modelos sincronizados exitosamente.');
    // Utilizar findOrCreate para buscar un usuario o crearlo si no existe
    const [admin, created] = yield db_1.models.User.findOrCreate({
        where: { email: "brayan@gmail.com" },
        defaults: {
            name: "brayan",
            password: yield (0, bcryptjs_1.hash)("brayan123", 8),
        }
    });
    if (created) {
        // Si el usuario fue creado, asignarle el rol de admin
        const rol = yield db_1.models.Role.create({ name: "admin" });
        yield admin.setRole(rol);
        console.log('Administrador creado exitosamente.');
    }
    else {
        console.log('El administrador ya existe. No se creará otro.');
    }
    // Iniciar el servidor
    app_1.default.listen(index_1.default.port, () => {
        console.log('Servidor corriendo en el puerto: ' + index_1.default.port);
    });
}))
    .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
