const utils = require("./utils.js");
const db = require("./db/database.js");
const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const port = 80;

// DB initialization stuffs
db.init();
db.load();

app.use('/public', express.static("public"));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/index.html");
});

app.get("/thread/:threadid", (req, res, next) => {
  if (db.rawDB.threads.length - 1 < req.params.threadid) {
    next();
  } else {
    res.sendFile(__dirname + '/public/pages/thread.html');
  }
});

app.get("/create", (req, res) => {
  res.sendFile(__dirname + "/public/pages/threadcreate.html");
});

app.all("/create/new", (req, res) => {
  db.rawDB.threads.push({
    itemname: req.body.itemname,
    count: 1,
    likes: 0,
    active: true,
  });
  db.write();
  res.status(200);
});

// API endpoints for various uses

app.get('/api/v1/thread/:threadid', (req,res,next) => {
  if (db.rawDB.threads.length - 1 < req.params.threadid) {
    next();
  } else {
    res.send(JSON.stringify(db.rawDB.threads[req.params.threadid]));
  }
})

app.get('/api/v1/threads', (req,res,next) => {
  res.send(JSON.stringify(db.rawDB.threads));
})

app.use((req, res) => {
  res.sendFile(__dirname + '/public/pages/404.html')
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
