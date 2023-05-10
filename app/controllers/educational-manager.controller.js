const db = require('../models')
const Educational_Manager = db.educational_manager
const bcrypt = require('bcrypt')
exports.create = async (req, res) => {
    console.log(req.body)
    const {
        college,
        firstName,
        lastName,
        identificationId,
        password,
        email,
        phoneNumber
    } = req.body

    const hash_password = await bcrypt.hash(String(password),10);
    const role = "manager";

    const educationalManager = new Educational_Manager({
        college,
        firstName,
        lastName,
        identificationId,
        hash_password,
        email,
        phoneNumber,
        role
    })

    educationalManager.save().then(() => {
        res.send(educationalManager)

    }).catch(err => {
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

    Educational_Manager.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update educational-manager with id=${id}. Maybe educational-manager was not found!`
                });
            } else res.send({message: "Educational_Manager was updated successfully."});
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Educational_Manager with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Educational_Manager.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Educational_Manager with id=${id}. Maybe Educational_Manager was not found!`
                });
            } else {
                res.send({
                    message: "Educational_Manager was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Educational_Manager with id=" + id
            });
        });
};

exports.getEducationalManager = (req, res) => {
    Educational_Manager.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving educational-manager."
            });
        });
};

exports.getEducationalManagerById = (req, res) => {
    const id = req.params.id;

    Educational_Manager.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found educational-manager with id " + id});
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({message: "Error retrieving Educational_Manager with id=" + id});
        });
}


