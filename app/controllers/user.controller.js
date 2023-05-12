const db = require('../models')
const logger = require("../utils/logger");
const User =  db.users
exports.updateField = (req, res) => {
    if(req.params.id && req.params.id.toString()===req.id.toString()) {
        const student_id = req.params.id;
        User.findOne({identificationId: student_id})
            .then(data => {
                User.findByIdAndUpdate(data.id, req.body, {useFindAndModify: false})
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update User with id=${data.id}. Maybe User was not found!`
                            });
                        } else res.send({message: "User was updated successfully."});
                    })
                    .catch(() => {
                        logger.error("Error updating User", {
                            metadata: {
                                req: {
                                    method: req.method,
                                    originalUrl: req.originalUrl,
                                    httpVersion: req.httpVersion
                                }
                            }
                        })
                        res.status(500).send({
                            message: "Error updating User with id=" + data.id
                        });
                    });
            })
            .catch(err => {
                logger.error("Some error occurred while retrieving user", {
                    metadata: {
                        req: {
                            method: req.method,
                            originalUrl: req.originalUrl,
                            httpVersion: req.httpVersion
                        }
                    }
                })
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving user."
                });
            });
    }
}
