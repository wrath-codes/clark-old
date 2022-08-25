import { prisma } from "@database/prismaClient";

interface IUpdateContractNumberDate {
  id_contract: string;
  number?: string;
  startDate?: string;
}

export class UpdateContractNumberDateUseCase {
  async execute({ id_contract, number, startDate }: IUpdateContractNumberDate) {
    if (startDate) {
      const contract = await prisma.contracts.update({
        where: { id: id_contract },
        data: {
          startDate: new Date(startDate),
          number: number && number,
        },
        include: {
          employer: true,
          operator: true,
        },
      });

      return contract;
    }
    const contract = await prisma.contracts.update({
      where: { id: id_contract },
      data: {
        number: number && number,
      },
      include: {
        employer: true,
        operator: true,
      },
    });

    return contract;
  }
}
