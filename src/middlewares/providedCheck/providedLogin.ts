import { NextFunction, Request, Response } from "express";

/**
 * @description checks if login was provided
 * @body {username: string - username of the login}
 * @body {password: string - password of the login}
 * @passed true if all fields were provided
 * @throws {object} - error message
 * @author Raphael Vaz
 */
export const providedLogin = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { username, password } = request.body;

	if (!username) {
		throw new Error("Username is required");
	}
	if (!password) {
		throw new Error("Password is required");
	}

	return next();
};
