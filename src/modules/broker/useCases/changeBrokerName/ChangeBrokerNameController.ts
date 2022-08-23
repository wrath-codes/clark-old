import { Request, Response } from "express";
import { ChangeBrokerNameUseCase } from "./ChangeBrokerNameUseCase";

export class ChangeBrokerNameController {
  async handle(request: Request, response: Response) {
    const { id_broker } = request.params;
    const { name } = request.body;

    const changeBrokerNameUseCase = new ChangeBrokerNameUseCase();

    const brokerWithDifferentName = await changeBrokerNameUseCase.execute(
      id_broker,
      name
    );

    return response.json(brokerWithDifferentName);
  }
}

