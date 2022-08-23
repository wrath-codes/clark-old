import { Request, Response } from "express";
import { FindAllEmployersUseCase } from "./FindAllEmployersUseCase";


export class FindAllEmployersController {
  async handle(request: Request, response: Response) {
    const findAllEmployersUseCase = new FindAllEmployersUseCase();
    const employers = await findAllEmployersUseCase.execute();

    return response.json(employers);
  }
}