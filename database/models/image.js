module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
        },
        highlight: {
            type: DataTypes.STRING,
        },
    },{
        paranoid: true,
        freezeTableName: true
    })

    Image.associate = models => {
        
    }

    return Image;
}