import { Request, Response } from "express";

import { EndContractUseCase } from "./EndContractUseCase";

export class EndContractController {
  async handle(request: Request, response: Response) {
    const { id_contract } = request.params;

    const endContractUseCase = new EndContractUseCase();
    const contract = await endContractUseCase.execute(id_contract);

    return response.status(200).json(contract);
  }
}
