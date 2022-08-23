import { Request, Response } from "express";
import { ChangeEmployerNameUseCase } from "./ChangeEmployerNameUseCase";

export class ChangeEmployerNameController {
  async handle(request: Request, response: Response) {
    const { id_employer } = request.params;
    const { name } = request.body;

    const changeEmployerNameUseCase = new ChangeEmployerNameUseCase();
    const employerWithDifferentName = await changeEmployerNameUseCase.execute(id_employer, name);

    return response.json(employerWithDifferentName);
  }
}