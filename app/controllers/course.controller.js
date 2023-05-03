const db = require('../models')
const Approved_Courses = db.approved_course;
const Semester_Course = db.semester_course;
const Course = db.course

exports.create = (req, res) => {
    console.log(req.body)

    const {
        course_date_time,
        exam_date_time,
        exam_location,
        professor_course,
        capacity,
        academic_semester,
        name,
        prerequisite,
        co_requisite,
        credit,
        course_type,
    } = req.body
    if (course_type === "APPROVED") {
        const approvedCourses = new Approved_Courses({
            name,
            prerequisite,
            co_requisite,
            credit,
        })
        approvedCourses.save().then(() => {
            res.send(approvedCourses)
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
    } else {
        const semesterCourse = new Semester_Course({
            course_date_time,
            exam_date_time,
            exam_location,
            professor_course,
            capacity,
            academic_semester,
            name,
            prerequisite,
            co_requisite,
            credit,
        })
        semesterCourse.save().then(() => {
            res.send(semesterCourse)
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })

    }
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Course.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update course with id=${id}. Maybe course was not found!`
                });
            } else res.send({message: "course was updated successfully."});
        })
        .catch(() => {
            res.status(500).send({
                message: "Error updating course with id=" + id
            });
        });

    //}


}

exports.delete = (req, res) => {
    const id = req.params.id;

    Course.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
                });
            } else {
                res.send({
                    message: "Course was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete  Course with id=" + id
            });
        });
};

exports.getCourses = (req, res) => {
    Course.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving courses."
            });
        });
};

exports.getCourseById = (req, res) => {
    const id = req.params.id;

    Course.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found course with id " + id});
            else res.send(data);
        })
        .catch(() => {
            res
                .status(500)
                .send({message: "Error retrieving course with id=" + id});
        });
}


