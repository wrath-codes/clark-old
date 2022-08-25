import { Request, Response } from "express";

import { CreatePlanUseCase } from "./CreatePlanUseCase";

export class CreatePlanController {
  async handle(request: Request, response: Response) {
    const { name, reach, ans_register, obstetricsCare, outpatientCare, hospitalCare } =
      request.body;
    const operatorId = request.params.id_operator;

    const createPlanUseCase = new CreatePlanUseCase();

    const plan = await createPlanUseCase.execute({
      name,
      reach,
      ans_register,
      operatorId,
      obstetricsCare,
      outpatientCare,
      hospitalCare,
    });

    return response.status(201).json(plan);
  }
}
