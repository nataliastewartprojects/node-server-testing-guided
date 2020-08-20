const express = require("express");

const Hobbits = require("../hobbits/hobbitsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running..." });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then((hobbits) => {
      res.status(200).json(hobbits);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.post("/hobbits", (req, res) => {
  Hobbits.insert(req.body)
    .then((ids) => {
      res.status(201).json({ data: ids });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = server;
