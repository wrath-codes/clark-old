import { prisma } from "@database/prismaClient";

export class DeleteOperatorContactUseCase {
  async execute(id_operator: string) {
    await prisma.operatorContacts.delete({
      where: {
        operatorId: id_operator,
      },
    });
  }
}
