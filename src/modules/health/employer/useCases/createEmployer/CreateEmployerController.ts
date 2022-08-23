import { Request, Response } from "express";
import { CreateEmployerUseCase } from "./CreateEmployerUseCase";


export class CreateEmployerController {
  async handle(request: Request, response: Response) {
    const { name, cnpj, address } = request.cnpj_info;

    const createEmployerUseCase = new CreateEmployerUseCase();

    const employer = await createEmployerUseCase.execute({
      name,
      cnpj,
      address,
    });

    return response.json(employer);
  }
}
