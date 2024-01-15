// ===== IMPORTACIONES =====
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const ejs = require('ejs');
// Base de datos
const db = require('./database/models/index.js');

// ===== RUTAS =====
const landing = require('./routes/landing.js');
const login = require('./routes/login.js');
const home = require('./routes/home.js');
const product = require('./routes/product.js');
const category = require('./routes/category.js');

const { GetAllProducts } = require('./helpers/getAllProducts');
// VARIABLES DE ENTORNO
const { MASTER_ADMIN, MASTER_PASSWORD, PORT } = process.env;

// ===== INSTANCIAS =====
const app = express();

// ==== SETS ====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(
    session({
        secret: '987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000,
        },
    }),
);

// ===== Middleworks =====
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Manejadores de rutas =====
app.use('/', landing);
app.use('/login', login);
app.use('/home', home);
app.use('/product/', product);
app.use('/category/', category);

// Añadir una categoria
app.get('/test', async(req, res) => {
    // Obtener todos los registros de la base de datos
    let productsQuery = await db.product.findAll({
        include: [db.image, db.category]
    });
    console.log(productsQuery);

    // Array vacio para ser enviado al controlador
    let products = [];

    // Iterar en cada uno de los registros para crear un objeto y agregarlo
    // a la variable de productos
    for (const product of productsQuery) {
        let vals = {
            id: product.id,
            name: product.name,
            price: product.price,
            code: product.code,
            images: product.images,
            category: product.category
        };
        products.push(vals);
    }

    return res.json(products)

})

// Añadir una categoria
app.get('/test/:id', async(req, res) => {
    const { id } = req.params;
    // Obtener todos los registros de la base de datos
    let product = await db.product.findOne({
        where: {
            id
        },
        include: [db.image, db.category]
    });
    console.log(product);

    let vals = {
        id: product.id,
        name: product.name,
        price: product.price,
        code: product.code,
        images: product.images,
        category: product.category
    };

    return res.json({data: vals})

})

// ==== SERVER ====
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
