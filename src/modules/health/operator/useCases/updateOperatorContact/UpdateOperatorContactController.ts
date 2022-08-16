import { Request, Response } from "express";
import { UpdateOperatorContactUseCase } from "./UpdateOperatorContactUseCase";

export class UpdateOperatorContactController {
	async handle(request: Request, response: Response) {
		const { id_operator } = request.params;
		const { firstName, lastName, email, cellphone } = request.body;

		const updateOperatorContactUseCase = new UpdateOperatorContactUseCase();

		const contact = await updateOperatorContactUseCase.execute({
			id_operator,
			firstName,
			lastName,
			email,
			cellphone,
		});

		return response.status(200).json(contact);
	}
}
