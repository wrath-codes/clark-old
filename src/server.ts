import { errorHandle } from "@middlewares/errorHandling";
import { routes } from "@routes/index.routes";
import { config } from "dotenv";
import express from "express";

config();
const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandle);

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}!`);
});
