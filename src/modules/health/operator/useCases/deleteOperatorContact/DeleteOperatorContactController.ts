import { Request, Response } from "express";
import { DeleteOperatorContactUseCase } from "./DeleteOperatorContactUseCase";

export class DeleteOperatorContactController {
	async handle(request: Request, response: Response) {
		const { id_operator } = request.params;

		const deleteOperatorContactUseCase = new DeleteOperatorContactUseCase();

		await deleteOperatorContactUseCase.execute(id_operator);

		return response.status(200).json({
			message: "Operator contact deleted successfully",
		});
	}
}
