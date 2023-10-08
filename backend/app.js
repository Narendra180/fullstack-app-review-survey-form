import express from "express";
import { errorHandler, notFound } from "./middleware/not-found.js";
import surveyRouter from "./routes//surveys/survey-routes.js";

const app = express();

app.use(express.json());


app.use("/api/v1/survey", surveyRouter);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req,res) => res.status(200).send("server is ready"));

export default app;