const SecondaryImages = require("./SecondaryImages");

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
        stock: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'products',
        timestamps: false
    });
    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        })
        Product.belongsTo(models.Age, {
            as: 'ages',
            foreignKey: 'age_id'
        });  
        Product.belongsToMany(models.User, {
            as: 'users',
            through: 'orders',
            foreignKey: 'product_id',
            otherKey: 'user_id'
        });
        Product.hasMany(models.Review, {
            as: 'reviews',
            foreignKey: 'product_fk_id',
        });
        Product.hasMany(models.OrderDetail, {
            as: 'order_detail',
            foreignKey: 'fk_product_id'
        });
        Product.hasOne(models.SecondaryImages, {
            as: 'secondary_images',
            foreignKey: 'id_product'
        })
    };
    return Product;
}