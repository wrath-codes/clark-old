import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if operator with the same id already exists
 * @param request.params.id_operator
 */
/** ------------------------------------------------------------------------------ */
export const operatorExistsId = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { id_operator } = request.params;

	// check if operator with same id already exists
	const operatorExists = await prisma.operators.findFirst({
		where: { id: id_operator },
	});
	if (!operatorExists) {
		throw new Error("Operator does not exist!");
	}

	return next();
};

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if user with the same email already exists
 * @param request.body.cnpj
 */
/** ------------------------------------------------------------------------------ */
export const operatorExistsCNPJ = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { cnpj } = request.body;

	// check if operator with same cnpj already exists
	const operatorExists = await prisma.operators.findFirst({
		where: { cnpj },
	});
	if (operatorExists) {
		throw new Error("Operator already exists!");
	}

	return next();
};
