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

if (!fs.existsSync(__dirname + '/public/images/user/thumbnails/0.png')) {
  fs.writeFileSync(__dirname + '/public/images/user/thumbnails/0.png','')
}

// DB initialization stuffs
db.init(true);
db.load();

const multer = require('multer')
const thumbnailStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/images/user/thumbnails')
  },
  filename: function (req, file, cb) {
    db.load()
    const uniqueSuffix = db.rawDB.threads.length
    cb(null, uniqueSuffix + '.png')
  }
})
const thumbnailUpload = multer({ storage: thumbnailStorage })

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

app.get("/signup", (req,res) => {
  res.sendFile(__dirname + "/public/pages/signup.html")
})

app.all("/create/new", thumbnailUpload.single('thumbnail'), (req, res) => {
  db.load()
  db.rawDB.threads.push({
    itemname: req.body.itemname,
    image: `/public/images/user/thumbnails/${db.rawDB.threads.length}.png`,
    count: 1,
    likes: 0,
    active: true,
  })
  db.write();
  res.redirect('/thread/' + (db.rawDB.threads.length-1));
});

app.post('/account/create', (req,res) => {
  if (req.body.username.match(/[^a-zA-Z0-9_.]/gm)) {
    res.status(405)
    return;
  }
  db.load()
  db.users.push({
    username: req.body.username,
    password: req.body.password,
    likedItems: '',
    badges: [],
    created: new Date().toTimeString(),
    claimedItems: ''
  })
  res.redirect('/')
})

// API endpoints for various uses

app.get('/api/v1/thread/:threadid', (req, res, next) => {
  if (db.rawDB.threads[req.params.threadid] == null) {
    next();
  } else {
    db.load()
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
