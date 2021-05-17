var express = require("express");
var router = express.Router();
const queue = require("../controllers/queue.contoller");

// Create a new queue
router.post("/", queue.create);

// Retrieve all queue
router.get("/", queue.findAll);

// Retrieve all finished queue
router.get("/finished", queue.findAllFinished);

// Retrieve a single queue with id
router.get("/:id", queue.findOne);

// Update a queue with id
router.put("/:id", queue.update);

// Delete a queue with id
router.delete("/:id", queue.delete);

// Create a new queue
router.delete("/", queue.deleteAll);

module.exports = router;
