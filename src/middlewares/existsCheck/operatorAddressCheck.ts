import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/**
 * @description This function is responsible for checking if the operator already has a contact
 * @params {id_operator} id of the operator
 * @throws {Error} if the operator already has an address
 * @returns {Promise<void>}
 * @author Raphael Vaz
 */
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
