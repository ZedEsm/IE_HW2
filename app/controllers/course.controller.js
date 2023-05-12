const db = require('../models')
const Approved_Courses = db.approved_course;
const Semester_Course = db.semester_course;
const Course = db.course
const Users = db.users
exports.create = (req, res) => {
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
        field,
    } = req.body
    if (course_type === "APPROVED") {
        const approvedCourses = new Approved_Courses({
            name,
            prerequisite,
            co_requisite,
            credit,
            field,
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
            field,
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
    if (req.role === "manager") {
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
    } else if (req.role === "student" || req.role === "professor") {
        const student_id = req.id
        const field = req.query.field;
        Users.findOne({identificationId: student_id})
            .then(data => {
                data.populate("courses").then(data => {
                    if (data.field === field) {
                        Course.find({field: field})
                            .then(data => {
                                res.send(data)
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while retrieving courses."
                                });
                            });
                    } else {
                        res.status(500).send({
                            message:
                                "field not found for this user."
                        });
                    }
                })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving student courses."
                        });
                    })
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving student."
                });
            })
    }
};
exports.getCourseById = (req, res) => {
    const id = req.params.id;
    const field = req.query.field;

    if (req.role === "manager") {
        Course.findById(id)
            .then((data) => {
                if (!data) res.status(404).send({message: "Not found course with id " + id});
                else res.send(data);
            })
            .catch(() => {
                res.status(500).send({message: "Error retrieving course with id=" + id});
            });
    } else if (req.role === "student" || req.role === "professor") {
        const student_id = req.id;
        Users.findOne({identificationId: student_id})
            .then((data) => {
                data.populate("courses").then((data) => {
                    const courseIdList = data.courses.map((item) => item._id.toString());
                    let foundField = false;
                    let foundId = false;
                    let foundCourse = null;

                    courseIdList.some((course_id) => {
                        //check id given with course id of professor
                        if (course_id === id) {
                            foundId = true;
                            const fieldList = data.courses.map((item) => item.field);
                            if (fieldList.includes(field)) {
                                foundField = true;
                                foundCourse = data.courses.find((course) => course._id.toString() === course_id);
                            }
                            return true;
                        }
                        return false;
                    });

                    if (foundId && foundField) {
                        res.status(200).send({foundCourse,message:"Course found."});
                    } else {
                        res.status(500).send({message: "Course id or field not found."});
                    }
                });
            })
            .catch((err) => {
                res.status(500).send({message: err.message || "Some error occurred while retrieving student."});
            });
    }
};

