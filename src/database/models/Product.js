module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DECIMAL
        },
        discount: {
            type: dataTypes.DECIMAL
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        age_id: {
            type: dataTypes.INTEGER
        },
        principal_img: {
            type: dataTypes.STRING
        },
        img_2: {
            type: dataTypes.STRING
        },
        img_3: {
            type: dataTypes.STRING
        },
        img_4: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        materials: {
            type: dataTypes.STRING
        },
        height: {
            type: dataTypes.DECIMAL
        },
        width: {
            type: dataTypes.DECIMAL
        },
        depth: {
            type: dataTypes.DECIMAL
        },
        weight: {
            type: dataTypes.DECIMAL
        },
        reviews_id: {
            type: dataTypes.INTEGER
        },
        stock: {
            type: dataTypes.INTEGER
        },
    },
    {
        tableName: 'products',
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
    return Product;
}