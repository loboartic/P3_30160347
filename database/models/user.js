module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            role: {
                type: DataTypes.STRING,
            },
        },
        {
            // paranoid desactivado para evitar tener categorias no borradas en la base de datos
            paranoid: false,
            freezeTableName: true,
        },
    );

    return User;
};
