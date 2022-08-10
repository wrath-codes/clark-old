import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/user/useCases/deleteUser/DeleteUserController";
import { FindAllUsersController } from "../modules/user/useCases/findAllUsers/FindAllUsersController";
import { FindUserController } from "../modules/user/useCases/findUser/FindUserController";
import { TurnUserAdminController } from "../modules/user/useCases/turnUserAdmin/TurnUserAdminController";
import { TurnUserRegularController } from "./../modules/user/useCases/turnUserRegular/TurnUserRegularController";
import { UpdateUserInfoController } from "./../modules/user/useCases/updateUserInfo/UpdateUserInfoUseController";

const userRoutes = Router();

// controllers
const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const findAllUsersController = new FindAllUsersController();
const deleteUserController = new DeleteUserController();
const updateUserInfoController = new UpdateUserInfoController();
const turnUserAdminController = new TurnUserAdminController();
const turnUserRegularController = new TurnUserRegularController();

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

/**
 * @route DELETE /api/user/:id_user
 * @desc Delete a user by id
 * @access Public
 * @returns {object} user
 */
userRoutes.delete("/:id_user", deleteUserController.handle);

/**
 * @route PUT /api/user/:id_user
 * @desc Update a user by id
 * @access Public
 * @returns {object} user
 */
userRoutes.put("/:id_user", updateUserInfoController.handle);

/**
 * @route PATCH /api/user/turnAdmin/:id_user
 * @desc Turns an user into an admin
 * @access Public
 * @returns {object} user
 */
userRoutes.patch("/turnAdmin/:id_user", turnUserAdminController.handle);

/**
 * @route PATCH /api/user/turnRegular/:id_user
 * @desc Turns an user into a regular user
 * @access Public
 * @returns {object} user
 */
userRoutes.patch("/turnRegular/:id_user", turnUserRegularController.handle);

export { userRoutes };
