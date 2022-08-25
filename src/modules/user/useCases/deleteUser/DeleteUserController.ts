import { Request, Response } from "express";

import { DeleteUserUseCase } from "@user/deleteUser/DeleteUserUseCase";

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id_user } = request.params;
    const deleteUserUseCase = new DeleteUserUseCase();
    const result = await deleteUserUseCase.execute(id_user);

    return response.json(result);
  }
}
