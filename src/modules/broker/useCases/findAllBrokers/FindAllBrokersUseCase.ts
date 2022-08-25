import { prisma } from "@database/prismaClient";

export class FindAllBrokersUseCase {
  async execute() {
    await prisma.brokers.findMany({
      include: {
        address: true,
      },
    });
  }
}
