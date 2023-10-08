const express = require("express");
const { mongoose } = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");


const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());

const port = process.env.port;

app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Blog App");
});




const mongoString = process.env.MONGO_URL;
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
})