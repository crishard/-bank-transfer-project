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
exports.passwordValid = void 0;
function passwordValid(password) {
    return __awaiter(this, void 0, void 0, function* () {
        var capitalLetters = /[A-Z]/;
        var numbers = /[0-9]/;
        var auxCapitalLetters = 0;
        var auxNumbers = 0;
        for (var i = 0; i < password.length; i++) {
            if (capitalLetters.test(password[i])) {
                auxCapitalLetters++;
            }
            else if (numbers.test(password[i])) {
                auxNumbers++;
            }
        }
        if (auxCapitalLetters <= 0) {
            return false;
        }
        else if (auxNumbers <= 0) {
            return false;
        }
        else {
            return true;
        }
    });
}
exports.passwordValid = passwordValid;
