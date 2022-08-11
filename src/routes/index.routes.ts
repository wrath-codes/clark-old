import { Router } from "express";

import { healthRoutes } from "@routes/health/index.routes";
import { userRoutes } from "@routes/user.routes";

const routes = Router();

//routes
routes.use("/users", userRoutes);
routes.use("/health", healthRoutes);

export { routes };
