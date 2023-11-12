module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
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
    },{
        paranoid: true,
        freezeTableName: true
    })

    Product.associate = models => {
        
    }

    return Product;
}