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
exports.FindUserController = void 0;
const FindUser_1 = require("../modules/useCases/Users/findUser/FindUser");
class FindUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = new FindUser_1.FindUser();
            const { userId } = req;
            const resultado = yield findUser.execute({
                userId
            });
            if (resultado instanceof Error) {
                return res.status(400).json(resultado.message);
            }
            else if (resultado) {
                return res.status(200).json(resultado);
            }
            return res.json("Erro no servidor");
        });
    }
}
exports.FindUserController = FindUserController;
