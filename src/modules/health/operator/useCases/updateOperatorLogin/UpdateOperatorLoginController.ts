import { Request, Response } from "express";
import { UpdateOperatorLoginUseCase } from "./UpdateOperatorLoginUseCase";

export class UpdateOperatorLoginController {
	async handle(request: Request, response: Response) {
		const { id_operator } = request.params;
		const { username, password } = request.body;

		const updateOperatorLoginUseCase = new UpdateOperatorLoginUseCase();

		const login = await updateOperatorLoginUseCase.execute({
			id_operator,
			username,
			password,
		});

		return response.status(200).json(login);
	}
}
