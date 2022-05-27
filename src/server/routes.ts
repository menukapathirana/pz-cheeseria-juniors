import * as express from "express";
const cheeses = require("./data/cheeses.json");

const router = express.Router();

router.get("/api/cheeses", (req, res, next) => {
  res.json(cheeses);
});

var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

let books = [];
var jsonParser = bodyParser.json();

const fs = require("fs");
const path = require("path");

let student = {
  teamId: "4",
  status: "pending",
};

//Purchase API
router.post("/api/purchase", jsonParser, function (req, res) {
  let data = JSON.stringify(student, null, 2);
  fs.readFile(
    path.resolve("./src/server/data/purchase.json"),
    function (err: any, data: any) {
      fs.writeFile(
        path.resolve("./src/server/data/purchase.json"),
        JSON.stringify(req.body),
        (err: any) => {
          if (err) throw err;
          console.log("Data written to file");
        }
      );
    }
  );

  res.send("Purchase completed");
});

const recent = require("./data/purchase.json");
router.get("/api/recent", (req, res, next) => {
  res.json(recent);
});

export default router;
