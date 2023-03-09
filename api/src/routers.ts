import { Router } from "express";

// imports
import { FindTransactionsController } from "./Controllers/FindTransacionController";
import { CreateUserController } from "./Controllers/CreateUserController";
import { FindBalanceController } from "./Controllers/FindBalanceController";
import { FiltersTransactionsController } from "./Controllers/FilterTransactionsController";
import { CreateTransactionController } from "./Controllers/CreateTransactionController";
import { FindUserController } from "./Controllers/FindUserController";
import { LoginUserController } from "./Controllers/LoginController";
import { checkUserAuthenticate } from "./modules/useCases/Users/checkUser/checkUser";
import { AlterUserController } from "./Controllers/AlterUserController";


const createUserController = new CreateUserController();
const findBalanceController = new FindBalanceController();
const findTransactionsController = new FindTransactionsController();
const loginUserController = new LoginUserController();
const findFilterTransactionsController = new FiltersTransactionsController();
const findUserController = new FindUserController();
const createTransactionController = new CreateTransactionController();
const alterUserController = new AlterUserController();

const routes = Router();

// posts
routes.post("/create_user", createUserController.handle);
routes.post("/login", loginUserController.handle);
routes.post("/create_transaction", checkUserAuthenticate, createTransactionController.handle);

// update
routes.put("/alter_user", checkUserAuthenticate, alterUserController.handle);

//gets 
routes.get("/balance", checkUserAuthenticate, findBalanceController.handle);
routes.get("/transactions", checkUserAuthenticate, findTransactionsController.handle);
routes.get("/filters_transactions", checkUserAuthenticate, findFilterTransactionsController.handle)
routes.get("/user", checkUserAuthenticate, findUserController.handle);

export default routes;