import { Request, Response } from "express";
import { ImportOperatorsUseCase } from "./ImportOperatorsUseCase";

export class ImportOperatorsController {
	async handle(request: Request, response: Response) {
		const { file }: any = request;

		const importOperatorsUseCase = new ImportOperatorsUseCase();

		await importOperatorsUseCase.execute(file);

		return response.status(201).json({ message: "Operators imported!" });
	}
}
