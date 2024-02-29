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
exports.checkJwt = void 0;
const jsw_handle_1 = require("../utils/jsw.handle");
const db_1 = require("../db");
const checkJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop();
        const isUser = (0, jsw_handle_1.verifyToken)(`${jwt}`);
        if (!isUser)
            return res.status(401).json({ msg: "Error token invalido" });
        // Verificar el tipo de isUser antes de acceder a la propiedad id
        if (typeof isUser === 'string') {
            // Manejar el caso en el que isUser es una cadena
            // Puedes decidir qué hacer en este caso
            return res.status(401).json({ msg: "Error: Token contiene una cadena en lugar de un objeto" });
        }
        req.user = isUser;
        let userFound = yield db_1.models.User.findOne({ where: { email: isUser.id } });
        console.log(jwt);
        if (userFound.token == jwt) {
            next();
        }
        else {
            return res.status(401).json({ msg: "Error: Token invalido" });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.checkJwt = checkJwt;
