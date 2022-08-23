import { prisma } from "@database/prismaClient";



export class FindBrokerUseCase {
  async execute (id_broker: string) {
    const broker = await prisma.brokers.findFirst({
      where: {
        id: id_broker
      },
      include: {
        address: true,
      },
    });
    
    return broker;
  }
}
