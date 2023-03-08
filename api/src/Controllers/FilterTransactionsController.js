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
exports.FiltersTransactionsController = void 0;
const FilterTransactions_1 = require("../modules/useCases/Transactions/findTransaction/filterTransactions/FilterTransactions");
class FiltersTransactionsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cashIn, cashOut, findDate } = req.body;
            const { userId } = req;
            const filtersTransactions = new FilterTransactions_1.FiltersTransactions();
            const resultado = yield filtersTransactions.execute({
                userId,
                cashIn,
                cashOut,
                findDate
            });
            if (resultado instanceof Error) {
                return res.json(resultado);
            }
            return res.json(resultado);
        });
    }
}
exports.FiltersTransactionsController = FiltersTransactionsController;
