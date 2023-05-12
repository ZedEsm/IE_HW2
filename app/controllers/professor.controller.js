const db = require('../models')
const Professor = db.professor
const bcrypt = require('bcrypt')
const logger = require("../utils/logger");
exports.create = async (req, res) => {
    console.log(req.body)

     const {college,
         field ,
         rank,
         firstName,
         lastName,
         identificationId,
         password,
         email,
         phoneNumber,
         courses
     } = req.body
    const hash_password = await bcrypt.hash(String(password),10);
    const role = "professor";

    const professor = new Professor({
        college,
        field ,
        rank,
        firstName,
        lastName,
        identificationId,
        hash_password,
        email,
        phoneNumber,
        role,
        courses
    })

    professor.save().then(() => {
        res.status(200).send(professor)

    }).catch(err => {
        logger.error("Error retrieving while saving professor", {
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

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Professor.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update professor with id=${id}. Maybe Professor was not found!`
                });
            } else res.status(200).send({message: "Professor was updated successfully."});
        })
        .catch(() => {
            logger.error("Error updating Professor with id", {
                metadata: {
                    req: {
                        method: req.method,
                        originalUrl: req.originalUrl,
                        httpVersion: req.httpVersion
                    }
                }
            })
            res.status(500).send({
                message: "Error updating Professor with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Professor.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Professor with id=${id}. Maybe Professor was not found!`
                });
            } else {
                logger.info("Professor deleted successfully", {
                    metadata: {
                        req: {
                            method: req.method,
                            originalUrl: req.originalUrl,
                            httpVersion: req.httpVersion
                        }
                    }
                })
                res.status(200).send({
                    message: "Professor was deleted successfully!"
                });
            }
        })
        .catch(() => {
            logger.error("Could not delete Professor", {
                metadata: {
                    req: {
                        method: req.method,
                        originalUrl: req.originalUrl,
                        httpVersion: req.httpVersion
                    }
                }
            })
            res.status(500).send({
                message: "Could not delete Professor with id=" + id
            });
        });
};

exports.getProfessors = (req, res) => {
    Professor.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            logger.error("Some error occurred while retrieving professors", {
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
                    err.message || "Some error occurred while retrieving professors."
            });
        });
};

exports.getProfessorById = (req, res) => {
    const id = req.params.id;

    Professor.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Professor with id " + id});
            else res.send(data);
        })
        .catch(() => {
            logger.error("Some error occurred while retrieving professor with id", {
                metadata: {
                    req: {
                        method: req.method,
                        originalUrl: req.originalUrl,
                        httpVersion: req.httpVersion
                    }
                }
            })
            res
                .status(500)
                .send({message: "Error retrieving Professor with id=" + id});
        });
}



