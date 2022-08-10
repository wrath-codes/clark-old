import { Router } from "express";
import { healthRoutes } from "./health/index.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

//routes
routes.use("/users", userRoutes);
routes.use("/health", healthRoutes);

export { routes };
