import { prisma } from "@database/prismaClient";
import { PlanReach } from "@prisma/client";
import { slugifyName } from "@utils/slugfyName";
import { parse as csvParse } from "csv-parse";
import fs from "fs";

interface IImportPlans {
	name: string;
	ans_register: string;
	reach: PlanReach;
}

export class ImportPlansUseCase {
	// load data to temp file
	loadPlans(file: Express.Multer.File): Promise<IImportPlans[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const plans: IImportPlans[] = [];

			const parseFile = csvParse();

			stream.pipe(parseFile);

			parseFile
				.on("data", async (line) => {
					const [name, ans_register, reach] = line;

					plans.push({
						name,
						ans_register,
						reach,
					});
				})
				.on("end", () => {
					// remove temp file
					fs.promises.unlink(file.path);
					resolve(plans);
				})
				.on("error", (error) => {
					reject(error);
				});
		});
	}

	// import operators
	async execute(file: Express.Multer.File, id_operator: string): Promise<void> {
		const plans = await this.loadPlans(file);

		plans.map(async (plan) => {
			const { name, ans_register, reach } = plan;

			// check if the operator has a plan with the same ans_register
			const planExists = await prisma.plans.findUnique({
				where: { ans_register },
			});

			if (!planExists) {
				// create plan
				await prisma.plans.create({
					data: {
						name,
						ans_register,
						reach,
						slug: await slugifyName(name),
						operator: {
							connect: { id: id_operator },
						},
					},
				});
			} else {
				await prisma.plans.update({
					where: { id: planExists.id },
					data: {
						name,
						ans_register,
						reach,
						slug: await slugifyName(name),
						operator: {
							connect: { id: id_operator },
						},
					},
				});
			}
		});
	}
}
