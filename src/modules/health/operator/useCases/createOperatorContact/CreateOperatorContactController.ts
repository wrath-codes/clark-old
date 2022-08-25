import { Request, Response } from "express";

import { CreateOperatorContactUseCase } from "./CreateOperatorContactUseCase";

export class CreateOperatorContactController {
  async handle(request: Request, response: Response) {
    const { id_operator } = request.params;
    const { firstName, lastName, email, cellphone } = request.body;

    const createOperatorContactUseCase = new CreateOperatorContactUseCase();
    const operatorWithContact = await createOperatorContactUseCase.execute({
      id_operator,
      firstName,
      lastName,
      email,
      cellphone,
    });

    return response.status(201).json(operatorWithContact);
  }
}
