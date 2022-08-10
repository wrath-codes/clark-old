import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { FindAllUsersController } from "../modules/user/useCases/findAllUsers/FindAllUsersController";
import { FindUserController } from "../modules/user/useCases/findUser/FindUserController";

const userRoutes = Router();

// controllers
const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const findAllUsersController = new FindAllUsersController();

/**
 * @route POST /api/user
 * @desc Create a new user
 * @access Public
 * @returns {object} user
 */
userRoutes.post("/", createUserController.handle);

/**
 * @route GET /api/user
 * @desc Find all users
 * @access Public
 * @returns Users[]
 */
userRoutes.get("/", findAllUsersController.handle);

/**
 * @route GET /api/user/:id_user
 * @desc Find a user by id
 * @access Public
 * @returns {object} user
 */
userRoutes.get("/:id_user", findUserController.handle);

export { userRoutes };

