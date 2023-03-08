"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CreateUser = void 0;
const prismaClient_1 = require("../../../../dataBase/prismaClient");
const bcrypt = __importStar(require("bcrypt"));
const validatePassword_1 = require("../../../helpers/validatePassword");
const messages_1 = require("../../../../messages/messages");
class CreateUser {
    execute({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield prismaClient_1.prisma.users.findFirst({
                where: {
                    username: username
                }
            });
            if (checkUser) {
                return new Error(messages_1.userExist.message);
            }
            else {
                const validadePassword = yield (0, validatePassword_1.passwordValid)(password);
                if (password.length < 8) {
                    return new Error(messages_1.shortPassword.message);
                }
                else if (validadePassword == false) {
                    return new Error(messages_1.invalidPassword.message);
                }
                else {
                    const hashPassword = yield bcrypt.hash(password, 8);
                    const createAccount = yield prismaClient_1.prisma.accounts.create({
                        data: {
                            balance: 100
                        }
                    });
                    const user = yield prismaClient_1.prisma.users.create({
                        data: {
                            username: username,
                            password: hashPassword,
                            accountId: createAccount.id
                        },
                    });
                    return user;
                }
            }
        });
    }
}
exports.CreateUser = CreateUser;
