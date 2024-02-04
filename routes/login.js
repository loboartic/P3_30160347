require('dotenv').config();
const express = require('express');
const router = express.Router();
const { MASTER_ADMIN, MASTER_PASSWORD } = process.env;
const {
    login,
    loginAuthenticate,
} = require('../controllers/login.controllers.js');

// Login
router.get('/', login);
// Login autentificar
router.post('/', loginAuthenticate);

module.exports = router;
