import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if website is valid
 * @param request.body.website
 */
/** ------------------------------------------------------------------------------ */
export const regexWebsite = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { website } = request.body;

	// passes if not provided provided
	if (!website) {
		return next();
	}

	if (
		!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
			website
		)
	) {
		throw new Error("Website is not valid!");
	}

	return next();
};
/** ------------------------------------------------------------------------------ */
