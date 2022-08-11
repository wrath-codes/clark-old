import { Request, Response } from "express";
import { CreateOperatorLoginUseCase } from "./CreateOperatorLoginUseCase";

export class CreateOperatorLoginController {
	async handle(request: Request, response: Response) {
		const { id_operator } = request.params;
		const { username, password } = request.body;

		const createOperatorLoginUseCase = new CreateOperatorLoginUseCase();

		const operatorWithLogin = await createOperatorLoginUseCase.execute({
			id_operator,
			username,
			password,
		});

		return response.status(201).json(operatorWithLogin);
	}
}
