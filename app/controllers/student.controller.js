const db = require('../models')
const Student = db.student
const bcrypt = require('bcrypt')

exports.create = async (req, res) => {
    console.log(req.body)
    const {firstName,
        lastName,
        identificationId,
        password,
        email,
        phoneNumber,
        degree,
        entryYear,
        incomingSemester,
        GPA,
        college,
        field} = req.body;

    const hash_password = await bcrypt.hash(String(password),10);
    const student = new Student({
        firstName,
        lastName,
        identificationId,
        hash_password,
        email,
        phoneNumber,
        degree,
        entryYear,
        incomingSemester,
        GPA,
        college,
        field
    })

    student.save().then(() => {
        res.send(student)

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

    Student.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found!`
                });
            } else res.send({message: "Student was updated successfully."});
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Student with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Student.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
                });
            } else {
                res.send({
                    message: "Student was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};

exports.getStudents = (req, res) => {
    Student.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        });
};

exports.getStudentById = (req, res) => {
    const id = req.params.id;

    Student.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Student with id " + id});
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({message: "Error retrieving Student with id=" + id});
        });
}


