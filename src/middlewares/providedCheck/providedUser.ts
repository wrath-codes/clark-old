import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if user is provided
 * @param request.body.email
 * @param request.body.password
 * @param request.body.passwordConfirmation
 * @param request.body.firstName
 * @param request.body.lastName
 * @passed true if all fields were provided
 * @throws {object} - error message
 */
/** ------------------------------------------------------------------------------ */

interface IProvidedUser {
	email: string;
	password: string;
	passwordConfirmation: string;
	firstName: string;
	lastName: string;
}

export const providedUser = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const {
		email,
		password,
		passwordConfirmation,
		firstName,
		lastName,
	}: IProvidedUser = request.body;

	// checks if an email was provided
	if (!email) {
		throw new Error("Email was not provided!");
	}

	// checks if first name was provided
	if (!firstName) {
		throw new Error("First name was not provided!");
	}

	// checks if last name was provided
	if (!lastName) {
		throw new Error("Last name was not provided!");
	}

	// checks if password was provided
	if (!password) {
		throw new Error("Password was not provided!");
	}

	// checks if password confirmation was provided
	if (!passwordConfirmation) {
		throw new Error("Password confirmation was not provided!");
	}

	return next();
};
/** ------------------------------------------------------------------------------ */
