import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler, notFound } from "./middleware/not-found.js";
import surveyRouter from "./routes//surveys/survey-routes.js";
import path from "path";

const app = express();

app.use(express.json());


app.use("/api/v1/survey", surveyRouter);


if(process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname,'frontend/dist')));
  app.get("*", (req,res) => res.sendFile(path.resolve(__dirname,"frontend/dist/index.html")))
} else {
  app.get("/", (req,res) => res.send("Server is ready"));
}

app.use(notFound);
app.use(errorHandler);

app.get("/", (req,res) => res.status(200).send("server is ready"));

export default app;