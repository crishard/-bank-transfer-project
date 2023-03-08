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
exports.checkPassword = void 0;
const bcrypt_1 = require("bcrypt");
const prismaClient_1 = require("../../dataBase/prismaClient");
function checkPassword(userId, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const findUser = yield prismaClient_1.prisma.users.findUnique({
            where: {
                id: userId
            }
        });
        function verify() {
            if (findUser) {
                const verifyUser = (0, bcrypt_1.compare)(password, findUser.password);
                return verifyUser;
            }
        }
        if (!verify) {
            return false;
        }
        else {
            return true;
        }
    });
}
exports.checkPassword = checkPassword;
