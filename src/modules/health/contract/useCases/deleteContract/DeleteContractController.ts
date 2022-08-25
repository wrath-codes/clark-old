import { Request, Response } from "express";

import { DeleteContractUseCase } from "./DeleteContractUseCase";

export class DeleteContractController {
  async handle(request: Request, response: Response) {
    const { id_contract } = request.params;

    const deleteContractUseCase = new DeleteContractUseCase();
    await deleteContractUseCase.execute(id_contract);

    return response.status(200).json({
      message: "Contract deleted successfully",
    });
  }
}
