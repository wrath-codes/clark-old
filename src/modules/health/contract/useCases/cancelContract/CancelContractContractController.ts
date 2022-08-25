import { Request, Response } from "express";

import { CancelContractUseCase } from "./CancelContractUseCase";

export class CancelContractController {
  async handle(request: Request, response: Response) {
    const { id_contract } = request.params;

    const cancelContractUseCase = new CancelContractUseCase();
    const contract = await cancelContractUseCase.execute(id_contract);

    return response.status(200).json(contract);
  }
}
