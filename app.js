// ===== IMPORTACIONES =====
require('dotenv').config();
const express = require('express');
const session = require("express-session");
const path = require('path');
const login = require('./routes/login.js');
const morgan = require('morgan');
const db = require('./database/models/index.js');
const {
  MASTER_ADMIN, MASTER_PASSWORD,
} = process.env;


console.log("Funcionando las varibles de entorno");
console.log(MASTER_ADMIN);

// ===== RUTAS =====


// ===== INSTANCIAS =====
const app = express();


// ==== SETS ====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
  saveUninitialized: true,
  resave: true,
    cookie:{
      maxAge: 60000,
    }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===== Manejadores de rutas =====
app.use('/login', login);


// ==== ENDPOINTS ====
app.get('/', (req, res) => {
  console.log(req.session)
  res.render('index');
});


app.get('/home', (req, res) => {
  console.log(req.session)
  res.render('home');
});


app.post('/add/product', async (req, res) => {
  const data = req.body;

  let valores = {
    name:data.name,
    price:data.price,
    code:data.code,
  }

  let product = await db.product.create(valores);

  if (product) {
    // Respuesta el endpoint
    res.json({
      success: true,
      message: '¡Producto creado satisfactoriamente!',
      data: {
        id: product.id
      }
    });
  } else {
    res.json({
      success: false,
      message: 'Ocurrio un error al guardar la información',
    }); 
  }

});


app.post('/add/category', async (req, res) => {
    const data = req.body

    let category = await db.category.create(data)

    res.json({
        success: true,
        message: 'Categoria creada de forma exitosa',
        data: {
            category_id: category.id
        }
    })
})


// ==== SERVER ====
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
