import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if email is valid
 * @param request.body.email
 */
/** ------------------------------------------------------------------------------ */
export const regexEmail = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { email } = request.body;

	// passes if not provided provided
	if (!email) {
		return next();
	}

	if (
		!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
			email
		)
	) {
		throw new Error("Email is not valid!");
	}
	return next();
};
