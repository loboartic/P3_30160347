'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes,
        );
        console.log(`Loading model from: ${model}`);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        console.log(`Associating '${modelName}'...`);
        db[modelName].associate(db);
        console.log(`Association for '${modelName}' complete.`);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Verificar entorno de ejecución
process.env.NODE_ENV === 'development'
    ? sequelize.sync({ force: true })
    : sequelize.sync();

// Exportar el modulo
module.exports = db;
