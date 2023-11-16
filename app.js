// ===== IMPORTACIONES =====
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const login = require('./routes/login.js');
const morgan = require('morgan');
const ejs = require('ejs');
const db = require('./database/models/index.js');

// VARIABLES DE ENTORNO
const { MASTER_ADMIN, MASTER_PASSWORD, PORT } = process.env;

// ===== RUTAS =====

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Manejadores de rutas =====
app.use('/login', login);

// ==== ENDPOINTS ====
app.get('/', (req, res) => {
    res.render('index');
});

// === HOME ===
app.get('/home', async (req, res) => {
    let productsQuery = await db.product.findAll()

    let products = []

    for (product of productsQuery) {
        let vals = {
            id: product.id,
            name: product.name,
            price: product.price,
            code: product.code,
        }
        products.push(vals)
    }

    res.render('home', {'products': products});
});

app.post('/add/product', async (req, res) => {
    const data = req.body;

    // Crear objetos con los valores
    let values = {
        name: data.name,
        price: data.price,
        code: data.code,
    };

    if (Object.values(values).includes('')) {
        res.json({
            success: false,
            message: 'Hubo un error con la información suministrada',
        });
        return;
    }

    let product = await db.product.create(values);

    if (product) {
        // Respuesta el endpoint
        res.json({
            success: true,
            message: '¡Producto creado satisfactoriamente!',
            data: {
                id: product.id,
            },
        });
    } else {
        res.json({
            success: false,
            message: 'Ocurrio un error al guardar la información',
        });
    }
});

// Añadir una categoria
app.post('/add/category', async (req, res) => {
    // Obtener la data de la petic
    const data = req.body;

    // Guardar un producto    
    let category = await db.category.create(data);

    // Retornar una respuesta JSON
    res.json({
        success: true,
        message: '¡Categoria creada exitosamente!',
        data: {
            category_id: category.id,
            name: category.name,
        },
    });
});

// ==== SERVER ====
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
