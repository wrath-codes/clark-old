import { Request, Response } from "express";
import { AssignBrokerToEmployerUseCase } from "./AssignBrokerToEmployerUseCase";


export class AssignBrokerToEmployerController {
  async handle(request: Request, response: Response) {
    const { id_employer, id_broker } = request.params;
    const assignBrokerToEmployer = new AssignBrokerToEmployerUseCase();
    const result = await assignBrokerToEmployer.execute(id_employer, id_broker);

    return response.json(result);
  }
}