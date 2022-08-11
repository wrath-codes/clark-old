import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if email is valid
 * @param request.body.password
 * @param request.body.passwordConfirmation
 */
/** ------------------------------------------------------------------------------ */
export const passwordCheck = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { password, passwordConfirmation } = request.body;

	// checks if the password is at least 6 characters long
	if (password.length < 6) {
		throw new Error("Password must be at least 6 characters long!");
	}
	// checks if password has at least one number
	if (!password.match(/\d/)) {
		throw new Error("Password must have at least one number!");
	}
	// checks if password has at least one uppercase letter
	if (!password.match(/[A-Z]/)) {
		throw new Error("Password must have at least one uppercase letter!");
	}
	// checks if password has at least one lowercase letter
	if (!password.match(/[a-z]/)) {
		throw new Error("Password must have at least one lowercase letter!");
	}
	// checks if password has at least one special character
	if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
		throw new Error("Password must have at least one special character!");
	}
	// checks if password and password confirmation match
	if (password !== passwordConfirmation) {
		throw new Error("Passwords do not match!");
	}
	return next();
};

/** ------------------------------------------------------------------------------ */
