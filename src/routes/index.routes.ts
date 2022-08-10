import { Router } from "express";
import { userRoutes } from "./user.routes";

const routes = Router();

//routes
routes.use("/users", userRoutes);

export { routes };
