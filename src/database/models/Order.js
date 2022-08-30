module.exports = (sequelize, dataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        order_tatal_amt: {
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
    /* User.associate = (models) => {
        User.belongsTo(models.Orders, {
            as: 'products',
            through: 'orders',
            foreignKey: 'product_id',
            otherKey: ''
        })
    }; */
    return Order;
}