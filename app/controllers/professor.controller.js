const db = require('../models')
const Professor = db.professor

exports.create = (req, res) => {
    console.log(req.body)

    const professor = new Professor(req.body)

    professor.save().then(() => {
        res.send(professor)

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

    Professor.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update professor with id=${id}. Maybe Professor was not found!`
                });
            } else res.send({message: "Professor was updated successfully."});
        })
        .catch(() => {
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
                res.send({
                    message: "Professor was deleted successfully!"
                });
            }
        })
        .catch(() => {
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
            res
                .status(500)
                .send({message: "Error retrieving Professor with id=" + id});
        });
}


