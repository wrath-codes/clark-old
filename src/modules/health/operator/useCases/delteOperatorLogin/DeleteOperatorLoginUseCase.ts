import { prisma } from "@database/prismaClient";

export class DeleteOperatorLoginUseCase {
  async execute(id_operator: string) {
    await prisma.logins.delete({
      where: {
        operatorId: id_operator,
      },
    });
  }
}
