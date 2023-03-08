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
exports.CreateTransactionController = void 0;
const CreateTransaction_1 = require("../modules/useCases/Transactions/createTransaction/CreateTransaction");
class CreateTransactionController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userCashIn, value, password } = req.body;
            const { userId } = req;
            const createTransaction = new CreateTransaction_1.CreateTransaction();
            const resultado = yield createTransaction.execute({
                userId,
                password,
                userCashIn,
                value
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
exports.CreateTransactionController = CreateTransactionController;
