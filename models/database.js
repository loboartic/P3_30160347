const { Sequelize, DataTypes } = require('sequelize');
const User = require('../models/users.js');
const Products = require('../models/products.js');
const Categories = require('../models/categories.js');
const Images = require('../models/images.js');


// Coneccion con la base de datos
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db/database.sqlite'
});

// Paso de la instancia de sequalize como parametro
User(sequelize)
Products(sequelize)
Images(sequelize)
Categories(sequelize)

// Definición de los modelos
sequelize.models = { User, Products, Images, Categories };


// Exportar la conexión
module.exports = sequelize;