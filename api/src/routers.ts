import { Router } from "express";

// imports
import { FindTransactionsController } from "./Controllers/FindTransacionController";
import { CreateUserController } from "./Controllers/CreateUserController";
import { FindBalanceController } from "./Controllers/FindBalanceController";
import { FiltersTransactionsController } from "./Controllers/FilterTransactionsController";
import { CreateTransactionController } from "./Controllers/CreateTransactionController";
import { FindUserController } from "./Controllers/FindUserController";
import { LoginUserController } from "./Controllers/LoginController";
import { AuthMiddleware } from "./modules/useCases/Users/checkUser/AuthMiddleware";


const createUserController = new CreateUserController();
const findBalanceController = new FindBalanceController();
const findTransactionsController = new FindTransactionsController();
const loginUserController = new LoginUserController();
const findFilterTransactionsController = new FiltersTransactionsController();
const findUserController = new FindUserController();
const createTransactionController = new CreateTransactionController();

const routes = Router();

// posts
routes.post("/create_user", createUserController.handle);
routes.post("/login", loginUserController.handle);
routes.post("/create_transaction", AuthMiddleware.authenticate, createTransactionController.handle);
routes.post("/filters_transactions", AuthMiddleware.authenticate, findFilterTransactionsController.handle)

//gets 
routes.get("/balance", AuthMiddleware.authenticate, findBalanceController.handle);
routes.get("/transactions", AuthMiddleware.authenticate, findTransactionsController.handle);
routes.get("/user", AuthMiddleware.authenticate, findUserController.handle);

export default routes;