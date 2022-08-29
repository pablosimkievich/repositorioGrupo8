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
    /* User.associate = (models) => {
        User.belongsTo(models.Orders, {
            as: 'products',
            through: 'orders',
            foreignKey: 'product_id',
            otherKey: ''
        })
    }; */
    return OrderDetail;
}