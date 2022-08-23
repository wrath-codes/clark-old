import { Router } from "express";

import { brokerRoutes } from "@routes/broker.routes";
import { healthRoutes } from "@routes/health/index.routes";
import { userRoutes } from "@routes/user.routes";

const routes = Router();

//routes
routes.use("/users", userRoutes);
routes.use("/health", healthRoutes);
routes.use("/brokers", brokerRoutes);

export { routes };
