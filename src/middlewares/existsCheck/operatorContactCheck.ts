import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the operator already has a contact
 * @params {id_operator} id of the operator
 * @throws {Error} if the operator already has a contact
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
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
