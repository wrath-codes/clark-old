import { prisma } from "@database/prismaClient";

export class AssignBrokerToEmployerUseCase {
  async execute(id_employer: string, id_broker: string) {
    const employer = await prisma.employers.update({
      where: {
        id: id_employer,
      },
      data: {
        brokerId: id_broker,
      },
      include: {
        address: true,
        broker: true,
      },
    });

    return employer;
  }
}
