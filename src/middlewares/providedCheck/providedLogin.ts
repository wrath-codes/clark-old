import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */ /**
 * @description checks if Login was provided

 */
/** ------------------------------------------------------------------------------ */
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
