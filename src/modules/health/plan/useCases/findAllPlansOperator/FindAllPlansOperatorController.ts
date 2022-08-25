import { Request, Response } from "express";

import { FindAllPlansOperatorUseCase } from "./FindAllPlansOperatorUseCase";

export class FindAllPlansOperatorController {
  async handle(request: Request, response: Response) {
    const { id_operator } = request.params;

    const findAllPlansOperatorUseCase = new FindAllPlansOperatorUseCase();

    const plans = await findAllPlansOperatorUseCase.execute(id_operator);

    return response.json(plans);
  }
}
