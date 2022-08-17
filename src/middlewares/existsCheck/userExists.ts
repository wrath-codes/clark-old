import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

/**
 * @description This function is responsible for checking if the user exists in the database by id
 * @params {id_user} id of the user
 * @throws {Error} if the user doesn't exist
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const userExistsId = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { id_user } = request.params;

	const userExists = await prisma.users.findFirst({
		where: {
			id: id_user,
		},
	});
	if (!userExists) {
		throw new Error("User does not exist!");
	}

	return next();
};

/**
 * @description This function is responsible for checking if the user exists in the database by email
 * @body {email} email of the user
 * @throws {Error} if the user already exists
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
export const userExistsEmail = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { email } = request.body;

	// check if user with same email already exists
	const userExists = await prisma.users.findFirst({
		where: { email },
	});
	if (userExists) {
		throw new Error("User already exists");
	}

	return next();
};
