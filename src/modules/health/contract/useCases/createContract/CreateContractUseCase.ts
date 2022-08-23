import { prisma } from "@database/prismaClient";


interface ICreateContract {
  number: string;
  startDate: string;
  description: string;
  id_employer: string;
  id_operator: string;
}

export class CreateContractUseCase {
  async execute({ number, startDate, description, id_employer, id_operator }: ICreateContract) {
    const contract = await prisma.contracts.create({
      data: {
        number,
        startDate: new Date(startDate),
        description,
        employerId: id_employer,
        operatorId: id_operator,
      },
      include: {
        employer: true,
        operator: true,
      }
    });

    return contract;
  }
}