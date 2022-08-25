import { prisma } from "@database/prismaClient";

export class FindAllPlansOperatorUseCase {
  async execute(id_operator: string) {
    const plans = await prisma.plans.findMany({
      where: {
        operatorId: id_operator,
      },
    });

    return plans;
  }
}
