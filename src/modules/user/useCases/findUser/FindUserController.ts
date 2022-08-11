import { Request, Response } from "express";

import { FindUserUseCase } from "@user/findUser/FindUserUseCase";

export class FindUserController {
	async handle(request: Request, response: Response) {
		const { id_user } = request.params;

		const findUserUseCase = new FindUserUseCase();
		const user = await findUserUseCase.execute({
			id_user,
		});

		return response.json(user);
	}
}
