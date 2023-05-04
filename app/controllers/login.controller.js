const db = require('../models')
const Users = db.users

exports.checkLogin = (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const user = Users.find(user => user.name = username)
    if(user == null){
        return res.status(400).send('user not found')
    }

}
