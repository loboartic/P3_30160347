const { Sequelize, DataTypes } = require('sequelize');
function Produts(sequelize) {
    sequelize.define("products", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.STRING,
        },
        code: {
            type: Sequelize.STRING,
        },
    })
}

// Produts.associate = (models) => {
//     Produts.belongsTo(models.Categories)
// }

module.exports = Produts;