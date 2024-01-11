const express = require("express");
const router = express.Router();
const { home } = require("../controllers/home.controllers.js");

router.get("/", home);

module.exports = router;
