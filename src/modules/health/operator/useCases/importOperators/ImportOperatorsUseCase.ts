import { prisma } from "@database/prismaClient";
import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { operatorInfo } from "@utils/address/getInfoFromCnpj";
import { formatCep } from "@utils/format/formatCep";
import { formatCnpj } from "@utils/format/formatCnpj";
import { slugifyName } from "@utils/slugfyName";

interface IImportOperators {
  cnpj: string;
  website: string;
}

export class ImportOperatorsUseCase {
  // load data to temp file
  // eslint-disable-next-line no-undef
  loadOperators(file: Express.Multer.File): Promise<IImportOperators[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const operators: IImportOperators[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [cnpj, website] = line;

          operators.push({
            cnpj,
            website,
          });
        })
        .on("end", () => {
          // remove temp file
          fs.promises.unlink(file.path);
          resolve(operators);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  // import operators

  // eslint-disable-next-line no-undef
  async execute(file: Express.Multer.File, token: string): Promise<void> {
    const operators = await this.loadOperators(file);

    operators.map(async (operator) => {
      const { cnpj, website } = operator;
      // check if operator exists
      const operatorExists = await prisma.operators.findUnique({
        where: {
          cnpj: operator.cnpj,
        },
      });

      if (operatorExists) {
        // create operator address
        // checks if operator has address
        const operatorHasAddress = await prisma.operatorAddresses.findFirst({
          where: {
            operatorId: operatorExists.id,
          },
        });

        const cnpjFormatted = await formatCnpj(cnpj);

        const info = await operatorInfo(cnpjFormatted, token);

        const formatedZipCode = await formatCep(info.address.zip);

        if (!operatorHasAddress) {
          await prisma.operators.update({
            where: { id: operatorExists.id },
            data: {
              address: {
                create: {
                  street: info.address.street,
                  number: Number(info.address.number),
                  complement: info.address.details,
                  neighborhood: info.address.district,
                  city: info.address.city,
                  state: info.address.state,
                  country: "Brasil",
                  zipCode: formatedZipCode,
                },
              },
            },
          });
        } else {
          await prisma.operatorAddresses.update({
            where: { operatorId: operatorExists.id },
            data: {
              street: info.address.street,
              number: Number(info.address.number),
              complement: info.address.details,
              neighborhood: info.address.district,
              city: info.address.city,
              state: info.address.state,
              country: "Brasil",
              zipCode: formatedZipCode,
            },
          });
        }
      } else {
        const cnpjFormatted = await formatCnpj(cnpj);

        const info = await operatorInfo(cnpjFormatted, token);
        // create operator
        const operator = await prisma.operators.create({
          data: {
            name: info.name,
            cnpj,
            website,
            slug: await slugifyName(info.name),
          },
        });

        const formatedZipCode = await formatCep(info.address.zip);

        // create operator address
        await prisma.operators.update({
          where: { id: operator.id },
          data: {
            address: {
              create: {
                street: info.address.street,
                number: Number(info.address.number),
                complement: info.address.details,
                neighborhood: info.address.district,
                city: info.address.city,
                state: info.address.state,
                country: "Brasil",
                zipCode: formatedZipCode,
              },
            },
          },
          include: { address: true },
        });
      }
    });
  }
}
