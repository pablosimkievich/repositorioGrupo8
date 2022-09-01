module.exports = (sequelize, dataTypes) => {
    const Review = sequelize.define('Review', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_fk_id: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.INTEGER
        },
        review: {
            type: dataTypes.STRING
        },
        product_fk_id: {
            type:dataTypes.INTEGER
        }
    },
    {
        tableName: 'reviews',
        timestamps: false
    });
    Review.associate = (models) => {
        Review.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'product_fk_id',
        })
        Review.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_fk_id'
        })
        Review.belongsTo(models.OrderDetail, {
            as: 'order_detail',
            foreignKey: 'order_detail_fk_id'
        })
    }; 
    return Review;
}