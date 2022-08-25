import { prisma } from "@database/prismaClient";

export class DeleteContractUseCase {
  async execute(id_contract: string) {
    await prisma.contracts.delete({
      where: {
        id: id_contract,
      },
    });
  }
}
