const db = require("../models");
const Queue = db.queue;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const queue = new Queue({
    name: req.body.name,
    phone: req.body.phone,
    queue: req.body.queue,
    isFinished: req.body.isFinished ? req.body.isFinished : false,
  });

  queue
    .save(queue)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Queue.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Queue.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Queue.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Queue.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Queue with queue number " + req.params.queue,
        });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Queue with number=" + queue });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Queue.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Queue with queue number=${id}`,
        });
      } else res.send({ message: "Queue was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Queue with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Queue.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Queue with id=${id}. Maybe Queue was not found!`,
        });
      } else {
        res.send({
          message: "Queue was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Queue with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Queue.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Queue were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Queue.",
      });
    });
};

exports.findAllFinished = (req, res) => {
  Queue.find({ isFinished: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving queues.",
      });
    });
};
