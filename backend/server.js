import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}.....`)
})

