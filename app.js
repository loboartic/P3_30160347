// ===== IMPORTACIONES =====
require('dotenv').config();
const express = require('express');
const path = require('path');
const login = require('./routes/login.js');
const morgan = require('morgan');
const sequelize = require('./models/database.js');
const {
  MASTER_ADMIN, MASTER_PASSWORD,
} = process.env;
const session = require('express-session');


console.log("Funcionando las varibles de entorno");
console.log(MASTER_ADMIN);

// ===== RUTAS =====


// ===== INSTANCIAS =====
const app = express();


// ==== SETS ====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Manejadores de rutas =====
app.use('/login', login);

// ===== DATABASE =====
sequelize.sync('force', true)
  .then(() => {
    console.log('Database connection established')
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
});

// ==== RUTAS ====
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('home');
});

// ==== SERVER ====
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
