"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionError = exports.emptyFilters = exports.noMovement = exports.invalidPassword = exports.shortPassword = exports.userNotExist = exports.userExist = exports.userShortName = exports.userTokenIsInvalid = exports.permissionDenied = exports.internalError = void 0;
exports.internalError = {
    message: 'Erro interno no servidor!'
};
exports.permissionDenied = {
    message: "Você não tem permissão para esta ação"
};
exports.userTokenIsInvalid = {
    message: 'Token inexistente ou inválido!'
};
exports.userShortName = {
    message: "Nome de usuário muito curto"
};
exports.userExist = {
    message: "Nome de usuário já cadastrado"
};
exports.userNotExist = {
    message: "Usuário não cadastrado"
};
exports.shortPassword = {
    message: "Senha muito curta"
};
exports.invalidPassword = {
    message: "Sua senha deve ter ao menos uma letra um número e uma letra maiúscula!"
};
exports.noMovement = {
    message: "Nenhuma movimentação realiza com sua conta!"
};
exports.emptyFilters = {
    message: "Nenhum filtro selecionado!"
};
exports.transactionError = {
    message: "Erro de transação, por favor, informar corretamente os dados!"
};
