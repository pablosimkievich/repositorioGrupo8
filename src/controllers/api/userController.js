const db = require('../../database/models/index');


const getUsers = async (_req, res) => {
    try {
        const allUsers = await db.User.findAll()
        const users = allUsers.map(e =>{
            return {
                id: e.id,
                name: e.user_first_name + ' ' + e.user_last_name,
                email: e.user_mail,
                user_cel: e.user_cel,
                user_address: e.user_address,
                user_img: e.user_img,
                dni: e.dni,
                user_type_id: e.user_type_id,
                password: e.password,
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
                {
                    association: 'order_detail'
                },
                {
                    association: 'orders'
                },
                {
                    association: 'reviews'
                },
                {
                    association: 'users_type'
                }     
            ]
        })

        if (userDetail) {
            res.status(200).json(userDetail);
        } else {
            res.status(200).json(`No existe el usuario Nro: ${id}`)
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
   getUsers,
   userDetail
}