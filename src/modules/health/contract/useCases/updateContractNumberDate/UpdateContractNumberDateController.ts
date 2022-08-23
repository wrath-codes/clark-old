import { Request, Response } from "express";
import { UpdateContractNumberDateUseCase } from "./UpdateContractNumberDateUseCase";



export class UpdateContractNumberDateController {
  async handle(request: Request, response: Response) {
    const { id_contract } = request.params;
    const { number, startDate } = request.body;

    const updateContractNumberDateUseCase = new UpdateContractNumberDateUseCase();
    const contract = await updateContractNumberDateUseCase.execute({
      id_contract,
      number,
      startDate,
    });

    return response.status(200).json(contract);
  }
}