const db = require('../models')
const Users = db.users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const logger = require("../utils/logger")
exports.checkLogin = async (req, res) => {
    try {
        const userId = req.body.identificationId;
        const password = req.body.password;
        const user = await Users.findOne({identificationId: userId})
        if (user == null) {
            return res.status(400).send('user not found')
        }
        if (await bcrypt.compare(password, user.hash_password)) {
            console.log(user.role)
            const token = jwt.sign({id: user.identificationId, role: user.role}, process.env.ACCESS_TOKEN, {
                expiresIn: 345600// 4day
            });
            return res.status(200).json({
                "token": token
            })
        } else {
            logger.error("Incorrect password", {
                metadata: {
                    req: {
                        method: req.method,
                        originalUrl: req.originalUrl,
                        httpVersion: req.httpVersion
                    }
                }
            })

            // incorrect password
            return res.status(400).json({
                "message": "incorrect password"
            })
        }
    } catch (err) {
        // can't login
        return res.status(401).json({
            "message": err.message
        })
    }


}
