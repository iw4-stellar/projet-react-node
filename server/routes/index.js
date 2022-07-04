const express = require("express");
const router = express.Router();

router.get("/status", function (req, res, next) {
  res.status(200).json({ ok: true });
});

module.exports = router;
