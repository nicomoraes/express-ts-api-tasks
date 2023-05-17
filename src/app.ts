import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import api from "./api/";
import errorHandler from "./middlewares/error-handler";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(api);

app.use(errorHandler);

export default app;
