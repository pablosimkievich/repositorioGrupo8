module.exports = (sequelize, dataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fk_order_id: {
            type: dataTypes.INTEGER
        },
        fk_product_id: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'order_detail',
        timestamps: false
    });
    OrderDetail.associate = (models) => {
        OrderDetail.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'fk_product_id',
        })
        OrderDetail.belongsTo(models.Order, {
            as: 'orders',
            foreignKey: 'fk_order_id'
        })
        OrderDetail.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'fk_user_id'
        })
        OrderDetail.hasMany(models.Review, {
            as: 'reviews',
            foreignKey: 'order_detail_fk_id'
        })
    }; 
    return OrderDetail;
}