const { Sequelize, DataTypes } = require('sequelize');

function Images(sequelize) {
    sequelize.define("images", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: Sequelize.STRING,
        },
        highlight: {
            type: Sequelize.STRING,
        },
    })
}

module.exports = Images;