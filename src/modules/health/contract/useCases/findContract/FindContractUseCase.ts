import { prisma } from "@database/prismaClient";


export class FindContractUseCase {
  async execute(id_contract: string) {
    const contract = await prisma.contracts.findFirst({
      where: { id: id_contract },
      include: {
        employer: true,
        operator: true,
      },
    });

    return contract;
  }
}