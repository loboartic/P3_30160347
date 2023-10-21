// ===== IMPORTACIONES =====
const express = require('express');
const path = require('path');


// ===== INSTANCIAS =====
const app = express();


// ==== SETS ====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// ==== RUTAS ====
app.get('/', (req, res) => {
  res.render('index');
});


// ==== SERVER ====
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
