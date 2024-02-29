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
exports.logoutUser = exports.loginCtrl = exports.registerCtrl = void 0;
const auth_1 = require("../service/auth");
const registerCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUser = yield (0, auth_1.registerNewUser)(req.body);
    res.send(responseUser);
});
exports.registerCtrl = registerCtrl;
const loginCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const responseUser = yield (0, auth_1.loginUser)({ email, password });
        res.send(responseUser);
    }
    catch (error) {
        res.status(401).send(error);
    }
});
exports.loginCtrl = loginCtrl;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseUser = yield (0, auth_1.logout)(id);
        return res.status(200).json({ message: responseUser });
    }
    catch (error) {
        return res.status(401).send(error);
    }
});
exports.logoutUser = logoutUser;
