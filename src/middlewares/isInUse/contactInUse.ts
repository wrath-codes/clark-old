import { prisma } from "@database/prismaClient";
import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */
/**
 * @description checks if operator contact exists
 * @param request.body.email
 */
/** ------------------------------------------------------------------------------ */
export const operatorContactInUse = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { email } = request.body;

	// checks if this operator already has an address
	const emailInUse = await prisma.operatorContacts.findFirst({
		where: {
			email: email,
		},
	});
	if (emailInUse) {
		throw new Error("This email is already in use");
	}

	return next();
};
