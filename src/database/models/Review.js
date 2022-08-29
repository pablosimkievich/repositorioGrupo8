module.exports = (sequelize, dataTypes) => {
    const Review = sequelize.define('Review', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.INTEGER
        },
        review: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'reviews',
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
    return Review;
}