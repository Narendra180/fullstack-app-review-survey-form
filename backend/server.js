import app from "./app.js";

import connectDb from "./db/db.js";

const port = process.env.PORT || 5000;

async function startServer() {
  await connectDb();
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}.....`)
  })
}

startServer();


