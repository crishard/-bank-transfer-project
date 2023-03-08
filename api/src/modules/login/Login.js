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
exports.LoginUser = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const prismaClient_1 = require("../../dataBase/prismaClient");
class LoginUser {
    execute({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //Receber a senha e password
            // Verificar Cliente Existe
            const user = yield prismaClient_1.prisma.users.findFirst({
                where: { username },
            });
            if (!user) {
                return new Error("Usuário não cadastrado");
            }
            //Verificar se a senha está correta
            const compararSenha = yield (0, bcrypt_1.compare)(password, user.password);
            if (!compararSenha) {
                return new Error("Senha invalida");
            }
            //Gerar umm token
            const token = (0, jsonwebtoken_1.sign)({ username }, "chavesecreta", {
                subject: user.id,
                expiresIn: "1d",
            });
            return token;
        });
    }
}
exports.LoginUser = LoginUser;
