import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if CNPJ is valid
 * @param request.body.cnpj
 */
/** ------------------------------------------------------------------------------ */
export const regexCNPJ = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { cnpj } = request.body;

	// passes if not provided provided
	if (!cnpj) {
		return next();
	}

	if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(cnpj)) {
		throw new Error("CNPJ is not valid!");
	}

	return next();
};
/** ------------------------------------------------------------------------------ */
