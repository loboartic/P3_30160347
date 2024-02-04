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
const { MASTER_ADMIN, MASTER_PASSWORD, PORT, ENV_MORGAN } = process.env;


// ===== INSTANCIAS =====
const app = express();


// ==== SETS ====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Configuración de Express Session
app.use(session({
    secret: '987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b', // Una clave secreta para firmar la cookie de sesión
    resave: false,
    saveUninitialized: false,
}));


// ===== Middleworks =====
app.use(express.static(path.join(__dirname, 'public')));
ENV_MORGAN === 'development' ? app.use(morgan('dev')): undefined;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===== Manejadores de rutas =====
app.use('/', landing);
app.use('/login', login);
app.use('/home', home);
app.use('/product/', product);
app.use('/category/', category);


// ==== SERVER ====
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
