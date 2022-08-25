import { Request, Response } from "express";

import { FindBrokerUseCase } from "./FindBrokerUseCase";

export class FindBrokerController {
  async handle(request: Request, response: Response) {
    const { id_broker } = request.body;
    const findBrokerUseCase = new FindBrokerUseCase();
    const broker = await findBrokerUseCase.execute(id_broker);

    return response.json(broker);
  }
}
