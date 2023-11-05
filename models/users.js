const { Sequelize, DataTypes } = require('sequelize');
function User(sequelize) {
    sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING, 
        },
        password: {
            type: Sequelize.STRING,
        },
    })
}

module.exports = User;