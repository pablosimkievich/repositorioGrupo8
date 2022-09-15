const db = require('../database/models/index');
const op = db.Sequelize.Op;


const orderList = async (req, res) => {
    try {
        const allTheOrders = await db.Order.findAll({
            include: [
                {
                    association: 'order_detail'
                },
                {
                    association: 'users'
                },
                {
                    association: 'payment_method'
                }
            ]
    });
        const allTheOrderDetails = await db.OrderDetail.findAll({
            include: [
                {
                    association: 'orders'
                },
                {
                    association: 'products'
                },
            ]          
        })

        res.render('admin/orderList', {allTheOrders, allTheOrderDetails});

    } catch (error) {
        console.log(error);
    }
};

const orderDetail = async (req, res) => {
    try {
        const id = req.params.id
        const orderDetail = await db.Order.findByPk(id, {
            include: [
                {
                    association: 'users'
                },
                {
                    association: 'payment_method'
                },
                {
                    association: 'order_detail'
                }
            ]
        });
        const orderItems = await db.OrderDetail.findAll({
            where: {
                fk_order_id: id
            },
            include: [
                {
                    association: 'users'
                },
                {
                    association: 'orders'
                },
                {
                    association: 'products'
                },
                {
                    association: 'reviews'
                }
            ]
        }); 
        
        if (orderDetail) {
            res.render('admin/orderDetail', {orderDetail, orderItems});
        } else {
            res.send(`No existe la orden de compra nro. ${req.params.id}`)
        }

    } catch (error) {
        console.log(error);
    }
};

const userList = async (req, res) => {
    try {
        const allUsers = await db.User.findAll({
            include: [
                {
                    association: 'users_type'
                }
            ]
        });

        res.render('admin/userList', {allUsers})
    } catch (error) {
        console.log(error);
    }
}

const productList = async (req, res) => {
    try {

        const allTheProducts = await db.Product.findAll({
            include: [
                {
                    association: 'category'
                },
                {
                    association: 'ages'
                },
                {
                    association: 'secondary_images'
                },
            ]
        })

        res.render('admin/productos', {allTheProducts});
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    orderList,
    orderDetail,
    userList,
    productList
}