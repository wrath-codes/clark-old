import { prisma } from "@database/prismaClient";

export class DeleteOperatorUseCase {
  async execute(id_operator: string): Promise<void> {
    await prisma.operators.delete({
      where: {
        id: id_operator,
      },
    });
  }
}
