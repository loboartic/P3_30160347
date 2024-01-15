require('dotenv').config();
const express = require('express');
const router = express.Router();
const { MASTER_ADMIN, MASTER_PASSWORD } = process.env;
const {
    login,
    loginAuthenticate,
} = require('../controllers/login.controllers.js');

router.get('/', login);

router.post('/', loginAuthenticate);

module.exports = router;
