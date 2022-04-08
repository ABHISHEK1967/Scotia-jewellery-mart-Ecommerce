const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const options = {
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
  origin: "*",
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
require("dotenv").config({ path: "./config/.env" });
const morgan = require("./utility/logger");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const env = process.env.NODE_ENV || "local";
const port = process.env.PORT || "8080";

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors(options));
app.use(morgan("tiny"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(process.env.API_URL, routes);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database..... ");
  })
  .catch((err) => {
    console.log("Error connecting to database " + err);
  });

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
