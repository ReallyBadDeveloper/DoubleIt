const utils = require("./utils.js");
const tdb = require("./db/threadDB.js");
const bodyparser = require('body-parser')
const express = require("express");
const app = express();
const port = 80;

// DB initialization stuffs
tdb.init();
tdb.load();

app.use(express.static("public"));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/index.html");
});

app.get("/thread/:threadid", (req, res, next) => {
  if (tdb.rawDB.length - 1 < req.params.threadid) {
    next();
  } else {
    res.send(JSON.stringify(tdb.rawDB[req.params.threadid]));
  }
});

app.get("/create", (req, res) => {
  res.sendFile(__dirname + "/public/pages/threadcreate.html");
});

app.post("/create/new", (req, res) => {
  tdb.rawDB.push({
    itemname: req.body.itemname,
    count: 1,
    active: true
  });
  tdb.write()
  res.status(200)
});

app.use((req, res) => {
  res.send('<h1 style="text-align: center;">404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
