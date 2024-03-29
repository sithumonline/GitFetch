const fs = require("fs");
const express = require("express");

const dataPath = "./data/list.json";
const logPath = "./data/log.json";
const router = express.Router();

router.post("/", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) throw err;

    let _data = JSON.parse(data);
    _data.push(req.body);
    f(req);

    fs.writeFile(dataPath, JSON.stringify(_data, null, 2), (err) => {
      if (err)
        throw (err, res.status(400).json({ error: "Unable to add this repo" }));
      res.json({ msg: "Repo added successfully" });
      console.log("Data written to file");
    });
  });
});

function f(req) {
  fs.readFile(logPath, (_err, _data) => {
    if (_err) throw err;

    let logSet_ = JSON.parse(_data);

    let q = {
      repo: req.body.repo,
      stime: req.body.time * 60,
      diff: [],
    };

    logSet_.push(q);

    fs.writeFileSync(logPath, JSON.stringify(logSet_, null, 2), (werr) => {
      if (werr) throw werr;
      console.log("logSet_ written to file");
    });
  });
}

router.get("/repo/:id", (req, res) => {
  console.log(req.params.id);
  fs.readFile(`data/files/${req.params.id}.txt`, (err, data) => {
    if (err) {
      res.status(400).json({ error: "Repo not found" });
      throw err;
    }

    res.send(data);
  });
});

router.get("/list", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

router.get("/status", (req, res) => {
  fs.readFile(logPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

module.exports = router;
