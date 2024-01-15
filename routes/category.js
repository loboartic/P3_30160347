const express = require('express');
const router = express.Router();
const {
    homeCategories,
    addCategories,
    getAllCategories,
} = require('../controllers/categories.controllers.js');

router.get('/', homeCategories);
router.post('/add', addCategories);
router.post('/get-all-categories', getAllCategories);

module.exports = router;
