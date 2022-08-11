import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if user with the same id already exists
 * @param request.params.id_user
 */
/** ------------------------------------------------------------------------------ */
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

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if user with the same email already exists
 * @param request.body.email
 */
/** ------------------------------------------------------------------------------ */
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
