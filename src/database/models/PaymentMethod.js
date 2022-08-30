module.exports = (sequelize, dataTypes) => {
    const PaymentMethod = sequelize.define('PaymentMethod', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payment_method_type: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'payment_method',
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
    return PaymentMethod;
}