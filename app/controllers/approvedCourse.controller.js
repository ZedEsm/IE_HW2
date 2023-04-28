const db = require('../models')
const Approved_Course = db.approved_course

exports.create = (req, res) => {
    console.log(req.body)

    const approved_course = new Approved_Course(req.body)

    approved_course.save().then(() => {
        res.send(approved_course)
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

    Approved_Course.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update approved course with id=${id}. Maybe approved course was not found!`
                });
            } else res.send({message: "Approved course was updated successfully."});
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating Approved course with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Approved_Course.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Approved Course with id=${id}. Maybe Approved Course was not found!`
                });
            } else {
                res.send({
                    message: "Approved Course was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Approved Course with id=" + id
            });
        });
};
