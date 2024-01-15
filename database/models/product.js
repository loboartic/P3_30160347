const Category = require('./category.js');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'product',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.STRING,
            },
            code: {
                type: DataTypes.STRING,
            },
        },
        {
            // paranoid desactivado para evitar tener categorias no borradas en la base de datos
            paranoid: false,
            freezeTableName: true,
        },
    );
    Product.associate = (models) => {
        Product.belongsTo(models.category, { foreignKey: 'categoryId' }),
        Product.hasMany(models.image)
    };
    return Product;
};
