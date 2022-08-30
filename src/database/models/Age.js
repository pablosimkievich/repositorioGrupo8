module.exports = (sequelize, dataTypes) => {
    const Age = sequelize.define('Age', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recommended_age: {
            type: dataTypes.STRING
        },
        age_img: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'ages',
        timestamps: false
    });
    /* User.associate = (models) => {
        User.belongsTo(models.Orders, {
            as: 'products',
            through: 'orders',
            foreignKey: 'product_id',
            otherKey: ''
        })
    }; */
    return Age;
}