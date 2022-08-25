import { Request, Response } from "express";

import { DeleteBrokerUseCase } from "./DelteBrokerUseCase";

export class DeleteBrokerController {
  async handle(request: Request, response: Response) {
    const { id_broker } = request.params;

    const deleteBrokerUseCase = new DeleteBrokerUseCase();

    await deleteBrokerUseCase.execute(id_broker);

    return response.json({ message: "Broker deleted" });
  }
}
