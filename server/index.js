import express from "express";

import Connection from "./model/DBConnection.js";
import Router from "./routes/route.js"

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }))

app.use("/", Router);
Connection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
