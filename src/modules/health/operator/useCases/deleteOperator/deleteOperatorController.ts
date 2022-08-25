import { Request, Response } from "express";

import { DeleteOperatorUseCase } from "./deleteOperatorUseCase";

export class DeleteOperatorController {
  async handle(request: Request, response: Response) {
    const { id_operator } = request.params;

    const deleteOperatorUseCase = new DeleteOperatorUseCase();

    await deleteOperatorUseCase.execute(id_operator);

    return response.status(200).json({
      message: "Operator deleted successfully",
    });
  }
}
