import { prisma } from "@database/prismaClient";
import { slugifyName } from "@utils/slugfyName";
import { parse as csvParse } from "csv-parse";
import fs from "fs";

interface IImportOperators {
	name: string;
	cnpj: string;
	website: string;
	street: string;
	number: number;
	complement?: string;
	neighborhood: string;
	city: string;
	state: string;
	country: string;
	zipCode: string;
}

export class ImportOperatorsUseCase {
	// load data to temp file
	loadOperators(file: Express.Multer.File): Promise<IImportOperators[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const operators: IImportOperators[] = [];

			const parseFile = csvParse();

			stream.pipe(parseFile);

			parseFile
				.on("data", async (line) => {
					const [
						name,
						cnpj,
						website,
						street,
						number,
						complement,
						neighborhood,
						city,
						state,
						country,
						zipCode,
					] = line;

					operators.push({
						name,
						cnpj,
						website,
						street,
						number,
						complement,
						neighborhood,
						city,
						state,
						country,
						zipCode,
					});
				})
				.on("end", () => {
					// remove temp file
					resolve(operators);
				})
				.on("error", (error) => {
					reject(error);
				});
		});
	}

	// import operators

	async execute(file: Express.Multer.File): Promise<void> {
		const operators = await this.loadOperators(file);

		operators.map(async (operator) => {
			const {
				name,
				cnpj,
				website,
				street,
				number,
				complement,
				neighborhood,
				city,
				state,
				country,
				zipCode,
			} = operator;
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

				if (!operatorHasAddress) {
					await prisma.operators.update({
						where: { id: operatorExists.id },
						data: {
							address: {
								create: {
									street,
									number: Number(number),
									complement,
									neighborhood,
									city,
									state,
									country,
									zipCode,
								},
							},
						},
					});
				} else {
					await prisma.operatorAddresses.update({
						where: { operatorId: operatorExists.id },
						data: {
							street,
							number: Number(number),
							complement,
							neighborhood,
							city,
							state,
							country,
							zipCode,
						},
					});
				}
			} else {
				// create operator
				const operator = await prisma.operators.create({
					data: {
						name,
						cnpj,
						website,
						slug: await slugifyName(name),
					},
				});
				// create operator address
				await prisma.operators.update({
					where: { id: operator.id },
					data: {
						address: {
							create: {
								street,
								number: Number(number),
								complement,
								neighborhood,
								city,
								state,
								country,
								zipCode,
							},
						},
					},
					include: { address: true },
				});
			}
		});
	}
}
