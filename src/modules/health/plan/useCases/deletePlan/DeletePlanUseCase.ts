import { prisma } from "@database/prismaClient";

export class DeletePlanUseCase {
  async execute(id_plan: string) {
    await prisma.plans.delete({
      where: { id: id_plan },
    });
  }
}
