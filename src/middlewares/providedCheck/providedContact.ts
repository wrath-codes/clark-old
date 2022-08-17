import { NextFunction, Request, Response } from "express";

/**
 * @description checks if contact was provided
 * @body {email: string - email of the contact}
 * @body {firstName: string - first name of the contact}
 * @body {lastName: string - last name of the contact}
 * @body {cellphone: string - cellphone of the contact}
 * @passed true if all fields were provided
 * @throws {object} - error message
 * @author Raphael Vaz
 */
export const providedContact = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { firstName, lastName, email, cellphone } = request.body;

	if (!firstName) {
		throw new Error("First name is required");
	}
	if (!lastName) {
		throw new Error("Last name is required");
	}
	if (!email) {
		throw new Error("Email is required");
	}
	if (!cellphone) {
		throw new Error("Cellphone is required");
	}

	return next();
};
