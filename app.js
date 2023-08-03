const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

let PI = "";

const stream = fs.createReadStream("./pi-million.txt");
stream.on("data", (chunk) => (PI += chunk));
stream.on("end", () => {
  console.log("Billion PI digits loaded!");
});

const indexOf = (txt, date) => {
  let start = date.charAt(0);
  for (let i = 0; i < txt.length; i++) {
    if (txt.charAt(i) === start) {
      let found = true;
      for (let j = 1; j < date.length; j++) {
        if (txt.charAt(i + j) !== date.charAt(j)) {
          found = false;
          break;
        }
      }
      if (found) {
        return i;
      }
    }
  }
  return -1;
};

app.get("/find/:date", (req, res) => {
  let date = req.params.date;
  const index = indexOf(PI, date);
  res.send({
    index: index + (index < 0 ? 0 : -1),
    date: date,
  });
});

app.listen(port, () => {
  console.log(`RUNNING SERVER ON localhost:${port}`);
});
