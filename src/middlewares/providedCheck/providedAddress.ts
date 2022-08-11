import { NextFunction, Request, Response } from "express";

/** ------------------------------------------------------------------------------ */ /**
 * @description checks if address was provided
 * @param request.body.street - street of the address
 * @param request.body.number - number of the address
 * @param request.body.complement - complement of the address
 * @param request.body.city - city of the address
 * @param request.body.state - state of the address
 * @param request.body.country - country of the address
 * @param request.body.zipCode - zipCode of the address
 * @passed true if all fields were provided
 * @throws {object} - error message
 */
/** ------------------------------------------------------------------------------ */
export const providedAdress = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { street, number, complement, city, state, country, zipCode } =
		request.body;

	// checks if a street was provided
	if (!street) {
		throw new Error("Street is required");
	}
	// checks if a number was provided
	if (!number) {
		throw new Error("Number is required");
	}
	// checks if a city was provided
	if (!city) {
		throw new Error("City is required");
	}
	// checks if a state was provided
	if (!state) {
		throw new Error("State is required");
	}
	// checks if a country was provided
	if (!country) {
		throw new Error("Country is required");
	}
	// checks if a zipCode was provided
	if (!zipCode) {
		throw new Error("ZipCode is required");
	}

	return next();
};
