import { prisma } from "@database/prismaClient";



export class FindAllBrokersUseCase {
  async execute() {
    return await prisma.brokers.findMany({
      include: {
        address: true,
      }
    });
  }
}