const utils = require("./utils.js");
const db = require("./db/database.js");
const bodyparser = require("body-parser");
const fs = require('fs')
if (!fs.existsSync('./config.json')) {
  fs.writeFileSync('./config.json', `{ "port": 80 }`)
}
const config = require('./config.json')
const express = require("express");
const app = express();
const port = config.port;

// DB initialization stuffs
db.init();
db.load();

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/images/user/thumbnails')
  },
  filename: function (req, file, cb) {
    db.load()
    const uniqueSuffix = db.rawDB.threads.length
    cb(null, uniqueSuffix + '.png')
  }
})
const upload = multer({ storage: storage })

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

app.all("/create/new", upload.single('thumbnail'), (req, res) => {
  db.load()
  db.rawDB.threads.push({
    itemname: req.body.itemname,
    image: `/public/images/user/thumbnails/${db.rawDB.threads.length}.png`,
    count: 1,
    likes: 0,
    active: true,
  });
  db.write();
  res.redirect('/thread/' + (db.rawDB.threads.length-1));
});

// API endpoints for various uses

app.get('/api/v1/thread/:threadid', (req, res, next) => {
  if (db.rawDB.threads.length - 1 < req.params.threadid) {
    next();
  } else {
    res.json(db.rawDB.threads[req.params.threadid]);
  }
})

app.get('/api/v1/threads', (req, res, next) => {
  res.send(JSON.stringify(db.rawDB.threads));
})

app.use((req, res) => {
  res.sendFile(__dirname + '/public/pages/404.html')
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
