const db = require('../models')
const Users = db.users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.checkLogin = async (req, res) => {
    try {
        const userId = req.body.identificationId;
        const password = req.body.password;
        const user = await Users.findOne({identificationId: userId})
        console.log(user)
        if (user == null) {
            return res.status(400).send('user not found')
        }
        if (await bcrypt.compare(password, user.hash_password)) {
            console.log(user.role)
            const token = jwt.sign({id:user.identificationId, role: user.role}, process.env.ACCESS_TOKEN,{
                expiresIn: 345600// 4day
            });
            return res.status(200).json({
                "token": token
            })
        } else {
            // incorrect password
            return res.status(200).json({
                "message": "incorrect password"
            })
        }
    } catch (err) {
        // can't login
        return res.status(200).json({
            "message": err.message
        })
    }


}
