const Product = require('./product.js');
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'category',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            // paranoid desactivado para evitar tener categorias no borradas en la base de datos
            paranoid: false,
            freezeTableName: true,
        },
    );
    Category.associate = (models) => {
        Category.hasMany(models.product);
    };

    return Category;
};
