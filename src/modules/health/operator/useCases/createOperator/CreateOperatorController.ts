import { Request, Response } from "express";

import { CreateOperatorUseCase } from "@operator/createOperator/CreateOperatorUseCase";

/**
 * @description Controller class for createBrokerUseCase
 * @class CreateBrokerController
 * @ author Raphael Vaz
 */
export class CreateOperatorController {
  async handle(request: Request, response: Response) {
    const { name, cnpj, address } = request.cnpj_info;
    const { website } = request.body;

    const createOperatorUseCase = new CreateOperatorUseCase();

    const operator = await createOperatorUseCase.execute({
      name,
      cnpj,
      address,
      website,
    });

    return response.status(201).json(operator);
  }
}
