import { Request, Response } from "express";
import { CreateContractUseCase } from "./CreateContractUseCase";



export class CreateContractController {
  async handle(request: Request, response: Response) {
    const { id_employer, id_operator } = request.params;
    const { number, startDate, description } = request.body;

    const createContractUseCase = new CreateContractUseCase();
    const contract = await createContractUseCase.execute({
      number,
      startDate,
      description,
      id_employer,
      id_operator,
    });
    console.log(request);
    return response.status(201).json(contract);
  }
}