const Product = require("./product.js");
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    });
    Category.associate = (models) => {
        Category.hasMany(models.product);
    };

    return Category;
};
