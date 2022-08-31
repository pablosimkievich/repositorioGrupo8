module.exports = (sequelize, dataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        order_total_amt: {
            type: dataTypes.INTEGER
        },
        order_date: {
            type: dataTypes.DATE
        },
        order_status: {
            type: dataTypes.STRING
        },
        order_address: {
            type: dataTypes.STRING
        },
        pay_method_id: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'orders',
        timestamps: false
    });
    Order.associate = (models) => {
        Order.belongsTo(models.PaymentMethod, {
            as: 'payment_method',
            foreignKey: 'pay_method_id'
        })
        Order.hasMany(models.OrderDetail, {
            as: 'order_detail',
            foreignKey: 'fk_order_id'
        })
       
    }; 
    return Order;
}