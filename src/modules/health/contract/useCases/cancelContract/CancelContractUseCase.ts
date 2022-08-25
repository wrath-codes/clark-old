import { prisma } from "@database/prismaClient";

export class CancelContractUseCase {
  async execute(id_contract: string) {
    const contract = await prisma.contracts.update({
      where: { id: id_contract },
      data: {
        endDate: new Date(),
        status: "CANCELADO",
      },
      include: {
        operator: true,
        employer: true,
      },
    });

    return contract;
  }
}
