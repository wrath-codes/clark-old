import { Router } from "express";

// middlewares
import {
	userExistsEmail,
	userExistsId,
} from "@middlewares/existsCheck/userExists";
import { passwordCheck } from "@middlewares/passwordCheck";
import { providedUser } from "@middlewares/providedCheck/providedUser";
import { regexEmail } from "@middlewares/regexCheck/regexEmail";

// controllers import
import { CreateUserController } from "@user/createUser/CreateUserController";
import { DeleteUserController } from "@user/deleteUser/DeleteUserController";
import { FindAllUsersController } from "@user/findAllUsers/FindAllUsersController";
import { FindUserController } from "@user/findUser/FindUserController";
import { TurnUserAdminController } from "@user/turnUserAdmin/TurnUserAdminController";
import { TurnUserRegularController } from "@user/turnUserRegular/TurnUserRegularController";
import { UpdateUserInfoController } from "@user/updateUserInfo/UpdateUserInfoController";

// router creation
const userRoutes = Router();

// controllers creation
const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const findAllUsersController = new FindAllUsersController();
const deleteUserController = new DeleteUserController();
const updateUserInfoController = new UpdateUserInfoController();
const turnUserAdminController = new TurnUserAdminController();
const turnUserRegularController = new TurnUserRegularController();

/** ------------------------------------------------------------------------------ */

/**
 * @route POST /api/user
 * @desc Create a new user
 * @access Public
 * @returns {object} user
 */
userRoutes.post(
	"/",
	providedUser,
	regexEmail,
	passwordCheck,
	userExistsEmail,
	createUserController.handle
);

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
userRoutes.get("/:id_user", userExistsId, findUserController.handle);

/**
 * @route DELETE /api/user/:id_user
 * @desc Delete a user by id
 * @access Public
 * @returns {object} user
 */
userRoutes.delete("/:id_user", userExistsId, deleteUserController.handle);

/**
 * @route PUT /api/user/:id_user
 * @desc Update a user by id
 * @access Public
 * @returns {object} user
 */
userRoutes.put(
	"/:id_user",
	regexEmail,
	userExistsId,
	updateUserInfoController.handle
);

/**
 * @route PATCH /api/user/turnAdmin/:id_user
 * @desc Turns an user into an admin
 * @access Public
 * @returns {object} user
 */
userRoutes.patch(
	"/turnAdmin/:id_user",
	userExistsId,
	turnUserAdminController.handle
);

/**
 * @route PATCH /api/user/turnRegular/:id_user
 * @desc Turns an user into a regular user
 * @access Public
 * @returns {object} user
 */
userRoutes.patch(
	"/turnRegular/:id_user",
	userExistsId,
	turnUserRegularController.handle
);

/** ------------------------------------------------------------------------------ */

export { userRoutes };
