const express = require('express');
const router = express.Router();
const {
    homeCategories,
    addCategories,
    getAllCategories,
} = require('../controllers/categories.controllers.js');
const { verifySession } = require('../helpers/staySession.js');

router.get('/', verifySession, homeCategories);
router.post('/add', addCategories);
router.post('/get-all-categories', getAllCategories);

module.exports = router;
