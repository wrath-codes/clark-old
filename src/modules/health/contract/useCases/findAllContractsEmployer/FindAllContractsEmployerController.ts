import { Request, Response } from "express";

import { FindAllContractsEmployerUseCase } from "./FindAllContractsEmployerUseCase";

export class FindAllContractsEmployerController {
  async handle(request: Request, response: Response) {
    const { id_employer } = request.params;
    const findAllContractsEmployerUseCase = new FindAllContractsEmployerUseCase();
    const contracts = await findAllContractsEmployerUseCase.execute(id_employer);

    return response.json(contracts);
  }
}
