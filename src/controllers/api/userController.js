const db = require('../../database/models/index');

const getUsers = async (_req, res) => {
    try {
        const allUsers = await db.User.findAll()
        const users = allUsers.map(e =>{
            return {
                id: e.id,
                name: e.user_first_name + ' ' + e.user_last_name,
                email: e.user_mail,
                detail: `http://localhost:3000/user/${e.id}`
                }
        })
        const count = await db.User.count()
        
        res.status(200).json({count, users})
       
       
    } catch (error) {
        console.log(error);
    }
}

const userDetail = async (req, res) => {
    try {
        const id = req.params.id
        const userDetail = await db.User.findByPk(id, {
            include: [
                {association: 'order_detail'},
                 {association: 'reviews'},

                
            ]
        });
        
      

        if (userDetail) {
            res.status(200).json(userDetail);
        } 
        
    } catch (error) {
        console.log(error);
    };
};

    const getOrders = async (req,res) => {
        try {
            const orders = await db.Order.findAll(
                {include: [
                    {association: 'users'}     
                    ]
            }
            );
            const count = await db.Order.count();
            const totalSales = await db.Order.sum('order_total_amt')

            res.status(200).json({count,totalSales, orders})

        }catch (error) {
        console.log(error);
    };
    };





module.exports ={
   getUsers,
   userDetail,
   getOrders,
}