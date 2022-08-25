import { Request, Response } from "express";

import { CreateBrokerUseCase } from "./CreateBrokerUseCase";

export class CreateBrokerController {
  async handle(request: Request, response: Response) {
    const { name, cnpj, address } = request.cnpj_info;

    const createBrokerUseCase = new CreateBrokerUseCase();

    const broker = await createBrokerUseCase.execute({
      name,
      cnpj,
      address,
    });

    return response.status(201).json(broker);
  }
}
