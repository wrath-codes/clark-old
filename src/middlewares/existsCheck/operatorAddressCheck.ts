import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if operator address exists
 * @param request.params.id_operator
 */
/** ------------------------------------------------------------------------------ */
export const operatorAddressCheck = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { id_operator } = request.params;

	// checks if this operator already has an address
	const address = await prisma.operatorAddresses.findFirst({
		where: {
			operatorId: id_operator,
		},
	});
	if (address) {
		throw new Error("This operator already has an address");
	}

	return next();
};
