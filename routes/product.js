const express = require('express');
const routerProducts = express.Router();
const { upload } = require('../controllers/images.controllers.js');
const { verifySession } = require('../helpers/staySession.js')

const {
    addProduct,
    deleteProduct,
    viewProduct,
} = require('../controllers/products.controllers.js');

// Rutas
// Añadir productos
routerProducts.post('/add', upload.array('files'), addProduct);
// Borrar productos
routerProducts.post('/delete', deleteProduct);
// Ver un producto específico
routerProducts.get('/:id',verifySession, viewProduct);


module.exports = routerProducts;
