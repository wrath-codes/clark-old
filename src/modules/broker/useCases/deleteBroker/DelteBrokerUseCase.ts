import { prisma } from "@database/prismaClient";

export class DeleteBrokerUseCase {
  async execute(id_broker: string) {
    await prisma.brokers.delete({
      where: {
        id: id_broker,
      },
    });
  }
}
