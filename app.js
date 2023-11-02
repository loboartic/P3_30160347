// ===== IMPORTACIONES =====
const express = require('express');
const path = require('path');
const login = require('./routes/login.js')

// ===== RUTAS =====


// ===== INSTANCIAS =====
const app = express();


// ==== SETS ====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', login);


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
