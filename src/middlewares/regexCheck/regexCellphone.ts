import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if cellphone is valid
 * @param request.body.cellphone
 */
/** ------------------------------------------------------------------------------ */
export const regexCellphone = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { cellphone } = request.body;

	// passes if not provided provided
	if (!cellphone) {
		return next();
	}

	if (!/^\([1-9]{2}\)[9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/.test(cellphone)) {
		throw new Error("Cellphone is not valid!");
	}

	return next();
};
/** ------------------------------------------------------------------------------ */
