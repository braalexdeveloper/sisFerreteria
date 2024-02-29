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
exports.logout = exports.loginUser = exports.registerNewUser = void 0;
const db_1 = require("../db");
const { User, Role } = db_1.models;
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const jsw_handle_1 = require("../utils/jsw.handle");
const registerNewUser = ({ email, password, name }) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIs = yield User.findOne({ where: { email } });
    if (checkIs)
        return "Ya existe el usuario";
    const passHash = yield (0, bcrypt_handle_1.encrypt)(password);
    const registerNew = yield User.create({ email, password: passHash, name });
    return registerNew;
});
exports.registerNewUser = registerNewUser;
const loginUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let checkIs = yield User.findOne({
            where: { email },
            include: { model: Role }
        });
        if (!checkIs)
            throw "NOT_FOUND_USER";
        const isCorrect = yield (0, bcrypt_handle_1.verified)(password, checkIs.password);
        if (!isCorrect)
            throw "PASSWORD_INCORRECT";
        const token = (0, jsw_handle_1.generateToken)(checkIs.email);
        yield User.update({ token }, { where: { email } });
        let userFormat = {
            id: checkIs.id,
            name: checkIs.name,
            email: checkIs.email,
            image: checkIs.image,
            rol: checkIs.Role.name
        };
        return {
            token,
            user: userFormat
        };
    }
    catch (err) {
        console.log(err);
    }
});
exports.loginUser = loginUser;
const logout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield User.update({ token: null }, { where: { id } });
    return "Deslogueado!";
});
exports.logout = logout;
