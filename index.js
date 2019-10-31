const express = require("express");
const db = require("./data/hubs-model");

const server = express();

server.listen(4000, () => {
  console.log("=== Server is listening on port 4000 ===");
});

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Oh Hello!");
});

server.get("/punk", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({
        message: err,
        success: false
      });
    });
});

server.post("/punk", (req, res) => {
  const punkInfo = req.body;

  db.add(punkInfo).then(punk => {
    res
      .status(201)
      .json({
        success: true,
        punk
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          err
        });
      });
  });
});

server.delete("/punk/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id).then(punk => {
    if (punk) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({
          message: `I could not find that id = ${id}`
        })
        .catch(err => {
          res.status(500).json({ success: false, err });
        });
    }
  });
});

server.put("/punk/:id", (req, res) => {
  const { id } = req.params;
  const newPunk = req.body;

  db.update(id, newPunk)
    .then(newData => {
      if (newData) {
        res.status(200).json({ success: true, newData });
      } else {
        res
          .status(404)
          .json({ success: false, message: `id: ${id} does not exist` });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
