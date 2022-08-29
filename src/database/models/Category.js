module.exports = (sequelize, dataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING
        },
        category_descri: {
            type: dataTypes.STRING
        },
        category_img: {
            type: dataTypes.STRING
        }
    },
    {
        tableName: 'category',
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
    return Category;
}