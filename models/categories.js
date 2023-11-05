const { Sequelize, DataTypes } = require('sequelize');

function Categories(sequelize) {
        sequelize.define("categories", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
    })
}

// Categories.associate = (models) => {
//     Categories.hasMany(models.Produts)
// }

module.exports = Categories;