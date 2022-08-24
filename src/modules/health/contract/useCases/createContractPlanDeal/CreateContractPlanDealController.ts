import { Request, Response } from "express";
import { CreateContractPlanDealUseCase } from "./CreateContractPlanDealUseCase";



export class CreateContractPlanDealController {
  async handle(request: Request, response: Response) {
    const { id_contract } = request.params;
    const { id_plan } = request;
    const {
      age_0_18,
      age_19_23,
      age_24_28,
      age_29_33,
      age_34_38,
      age_39_43,
      age_44_48,
      age_49_53,
      age_54_58,
      age_59_above
    } = request.body;

    const createContractPlanDealUseCase = new CreateContractPlanDealUseCase();
    const planDeal = await createContractPlanDealUseCase.execute({
      id_contract,
      id_plan,
      age_0_18,
      age_19_23,
      age_24_28,
      age_29_33,
      age_34_38,
      age_39_43,
      age_44_48,
      age_49_53,
      age_54_58,
      age_59_above
    });

    return response.status(201).json(planDeal);

  }
}