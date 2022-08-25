import { prisma } from "@database/prismaClient";

interface ICreateContractPlanDeal {
  id_contract: string;
  id_plan: string;

  age_0_18: number;
  age_19_23: number;
  age_24_28: number;
  age_29_33: number;
  age_34_38: number;
  age_39_43: number;
  age_44_48: number;
  age_49_53: number;
  age_54_58: number;
  age_59_above: number;
}

export class CreateContractPlanDealUseCase {
  async execute({
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
    age_59_above,
  }: ICreateContractPlanDeal) {
    const planDeal = await prisma.planDeals.create({
      data: {
        contractId: id_contract,
        planId: id_plan,
      },
    });

    const planDealWithValues = await prisma.planDeals.update({
      where: {
        id: planDeal.id,
      },
      data: {
        values: {
          create: {
            age_0_18,
            age_19_23,
            age_24_28,
            age_29_33,
            age_34_38,
            age_39_43,
            age_44_48,
            age_49_53,
            age_54_58,
            age_59_above,
          },
        },
      },
      include: {
        plan: true,
        values: true,
        contract: true,
      },
    });

    return planDealWithValues;
  }
}
