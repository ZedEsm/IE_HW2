const db = require('../models')
const Admin = db.it_manager
const bcrypt = require('bcrypt')
const logger = require("../utils/logger");

exports.create = async (req, res) => {
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
        logger.error("error occurred while saving admin", {
            metadata: {
                req: {
                    method: req.method,
                    originalUrl: req.originalUrl,
                    httpVersion: req.httpVersion
                }
            }
        })
        res.status(500).send({
            message: err.message
        })
    })
}
