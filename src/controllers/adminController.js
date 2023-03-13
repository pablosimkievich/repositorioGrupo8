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

        res.render('admin/OrderList', {allTheOrders, allTheOrderDetails});

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
            res.render('admin/OrderDetail', {orderDetail, orderItems});
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
};

const userDetaille = async (req, res) => {
    try {
        const id = req.params.id
        const userDetail = await db.User.findByPk(id, {
            include: [
                {
                    association: 'users_type'
                },
                {
                    association: 'orders'
                }   
        ],
            
        });

        if (userDetail) {
            res.render('admin/userDetail', { userDetail });
        } else {
            res.send(`No existe el usuario nro. ${req.params.id}`)
        };

    } catch (error) {
        console.log(error);
    }
};




const reviewList = async (req, res) => {

    try {
        const allTheReviews = await db.Review.findAll({
            include: [
                {
                    association: 'products'
                },
                {
                    association: 'order_detail'
                },
                {
                    association: 'users'
                }
            ]
        });

        res.render('admin/reviewProductList', {allTheReviews});

    } catch(error) {

    }
};

const reviewDetail = async (req, res) => {

    try {

        const id = req.params.id;

        const theProduct = await db.Product.findByPk(id, {
            include: [
                {
                    association: 'reviews'
                }
            ]
        })
        const reviewDetails = await db.Review.findAll({
            where: {
                product_fk_id: id
            },
            include: [
                {
                    association: 'products'
                },
                {
                    association: 'users'
                }
            ]
            

        });

        if (reviewDetails) {
            res.render('admin/reviewProductDetail', { reviewDetails, theProduct });
        } else {
            res.send(`No existen las reviews del producto Nro. : ${req.params.id}`)
        };
    } catch(error) {

    }
};

const productOrders = async (req, res) => {
    try {
        const id = req.params.id
        const theProduct = await db.Product.findByPk(id, {
            include: [
                {
                    association: 'order_detail'
                },
                {
                    association: 'secondary_images'
                },
                {
                    association: 'category'
                },
                {
                    association: 'ages'
                }
            ]
        })

        const theOrderDetails = await db.OrderDetail.findAll({
            where: {
                fk_product_id: id
            },
            include: [
                {
                    association: 'users'
                },
                {
                    association: 'orders'
                }
            ]
        })

        if (theProduct) {

        } else {
            res.send(`No existe el producto Nro. ${id}`)
        }

        res.render('admin/productOrders', {theProduct, theOrderDetails})
    }catch(error) {
        console.log(error);
    }
}

const controlPanel = (req, res) => {
    res.render('admin/controlPanel')
};

const adminLogout = (req, res) => {
    // res.clearCookie('userEmail');  //  logout desactivado por fines prácticos
    // req.session.destroy();
    return res.redirect('/');
}

module.exports = {
    orderList,
    orderDetail,
    userList,
    userDetaille,
    reviewList,
    reviewDetail,
    productOrders,
    controlPanel,
    adminLogout
}
