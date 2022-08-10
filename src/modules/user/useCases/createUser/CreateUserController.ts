import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";




export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { firstName, lastName, email, password, passwordConfirmation, isAdmin } = request.body;


    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.execute({
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      isAdmin,
    });
    

    return response.status(201).json(user);
  }
}