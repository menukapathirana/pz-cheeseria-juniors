import express = require("express");
import apiRouter from "./routes";

const app = express();

app.use(express.static("public"));
app.use(apiRouter);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
