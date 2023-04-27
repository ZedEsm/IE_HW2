const db = require('../models')
const Student = db.student

exports.create = (req, res) => {
    console.log(req.body)
    const student = new Student(req.body)
    student.save().then(() => {
        res.send(student)

    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

