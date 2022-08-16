import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */ /**
 * @description checks if website was provided
 * @param request.body.website
 * @param request.body.cnpj
 * @param request.body.name
 * @passed true if all fields were provided
 * @throws {object} - error message
 */
/** ------------------------------------------------------------------------------ */
export const providedOperator = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { website, cnpj } = request.body;
	// checks if a website was provided
	if (!website) {
		throw new Error("Website is not provided!");
	}
	// checks if a cnpj was provided
	if (!cnpj) {
		throw new Error("CNPJ is not provided!");
	}

	return next();
};
