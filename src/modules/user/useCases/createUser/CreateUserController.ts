import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";




export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, passwordConfirmation } = request.body;


    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      passwordConfirmation,
    });

    return response.status(201).json(user);
  }
}