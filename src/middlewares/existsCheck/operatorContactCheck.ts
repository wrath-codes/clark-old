import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if operator contact exists
 * @param request.params.id_operator
 */
/** ------------------------------------------------------------------------------ */
export const operatorContactCheck = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { id_operator } = request.params;

	// checks if this operator already has an contact
	const contact = await prisma.operatorContacts.findFirst({
		where: {
			operatorId: id_operator,
		},
	});
	if (contact) {
		throw new Error("This operator already has an contact");
	}

	return next();
};
