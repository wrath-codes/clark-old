import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if Zipcode is valid
 * @param request.body.zipCode
 */
/** ------------------------------------------------------------------------------ */
export const regexZipCode = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { zipCode } = request.body;

	// passes if not provided provided
	if (!zipCode) {
		return next();
	}

	if (!/^[0-9]{5}-[0-9]{3}$/.test(zipCode)) {
		throw new Error("Zipcode is not valid!");
	}

	return next();
};
/** ------------------------------------------------------------------------------ */
