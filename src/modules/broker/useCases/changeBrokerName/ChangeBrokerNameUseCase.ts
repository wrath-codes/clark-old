import { prisma } from "@database/prismaClient";

import { slugifyName } from "@utils/slugfyName";

export class ChangeBrokerNameUseCase {
  async execute(id_broker: string, name: string) {
    const brokerWithDifferentName = await prisma.brokers.update({
      where: {
        id: id_broker,
      },
      data: {
        name,
        slug: await slugifyName(name),
      },
    });

    return brokerWithDifferentName;
  }
}
