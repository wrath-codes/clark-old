import { Request, Response } from "express";

import { FindContractUseCase } from "./FindContractUseCase";

export class FindContractController {
  async handle(request: Request, response: Response) {
    const { id_contract } = request.params;

    const findContractUseCase = new FindContractUseCase();
    const contract = await findContractUseCase.execute(id_contract);

    return response.status(200).json(contract);
  }
}
