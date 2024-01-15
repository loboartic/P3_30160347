const express = require('express');
const router = express.Router();
const { landing } = require('../controllers/landing.controllers.js');

router.get('/', landing);

module.exports = router;
