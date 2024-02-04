const express = require('express');
const router = express.Router();
const { home } = require('../controllers/home.controllers.js');
const { verifySession } = require('../helpers/staySession.js')

router.get('/', verifySession, home);

module.exports = router;
