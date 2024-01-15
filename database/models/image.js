module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define(
        'image',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            destination: {
                type: DataTypes.STRING,
            },
            path: {
                type: DataTypes.STRING,
            },
            originalName: {
                type: DataTypes.STRING,
            }, 
            filename: {
                type: DataTypes.STRING,
            },
            mimetype: {
                type: DataTypes.STRING,
            },
        },
        {
            // paranoid desactivado para evitar tener categorias no borradas en la base de datos
            paranoid: false,
            freezeTableName: true,
        },
    );

    Image.associate = (models) => {
        Image.belongsTo(models.product, { foreignKey: 'productId' });
    };

    return Image;
};
