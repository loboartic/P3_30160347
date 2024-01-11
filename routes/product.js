const express = require("express");
const router = express.Router();

const { addProduct, deleteProduct, viewProduct } = require("../controllers/products.controllers.js");

// Rutas
router.post('/add', addProduct)
router.post('/delete', deleteProduct)
router.get('/:id', viewProduct)

module.exports = router;