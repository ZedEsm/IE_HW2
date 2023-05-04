const db = require('../utils')
const Admin = db.it_manager
const bcrypt = require('bcrypt')

exports.create = async (req, res) => {
    console.log(req.body)
    const {firstName,
        lastName,
        identificationId,
        password,
        email,
        phoneNumber,
       } = req.body;

    const hash_password = await bcrypt.hash(String(password),10);
    const role = "admin";
    const admin = new Admin({
        firstName,
        lastName,
        identificationId,
        hash_password,
        email,
        phoneNumber,
        role
    })

    admin.save().then(() => {
        res.status(200).json({"message":"admin saved"})

    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}
