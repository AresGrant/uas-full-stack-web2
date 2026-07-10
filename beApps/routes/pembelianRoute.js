const express = require("express");

const router = express.Router();

const pembelianController = require("../controllers/pembelianController");

router.get("/", pembelianController.getAll);

router.get("/:id", pembelianController.getById);

router.post("/", pembelianController.create);

router.put("/:id", pembelianController.update);

router.delete("/:id", pembelianController.delete);

module.exports = router;