import { Request, Response } from "express";

import { UpdateUserInfoUseCase } from "@user/updateUserInfo/UpdateUserInfoUseCase";

export class UpdateUserInfoController {
	async handle(request: Request, response: Response) {
		const { id_user } = request.params;
		const { firstName, lastName, email } = request.body;
		const updateUserInfoUseCase = new UpdateUserInfoUseCase();
		const result = await updateUserInfoUseCase.execute({
			id_user,
			firstName,
			lastName,
			email,
		});

		return response.json(result);
	}
}
