import { Request, Response } from "express";
import { DeleteEmployerUseCase } from "./DeleteEmployerUseCase";



export class DeleteEmployerController {
  async handle(request: Request, response: Response) {
    const { id_employer } = request.params;

    const deleteEmployerUseCase = new DeleteEmployerUseCase();
    await deleteEmployerUseCase.execute(id_employer);

    return response.json({
      message: "Employer deleted successfully"
    });
  }
}