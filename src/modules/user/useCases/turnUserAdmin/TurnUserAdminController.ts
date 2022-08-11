import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "@user/turnUserAdmin/TurnUserAdminUseCase";

export class TurnUserAdminController {
	async handle(request: Request, response: Response) {
		const { id_user } = request.params;

		const turnUserAdminUseCase = new TurnUserAdminUseCase();
		const user = await turnUserAdminUseCase.execute(id_user);

		return response.json(user);
	}
}
