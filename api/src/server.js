"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const messages_1 = require("./messages/messages");
const routers_1 = __importDefault(require("./routers"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routers_1.default);
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
    }
    return res
        .status(500)
        .json({ status: "erro", message: messages_1.internalError });
});
app.listen(3000, () => console.log("Servidor rodando"));
