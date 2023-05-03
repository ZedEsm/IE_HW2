const create_approved_course = require("../controllers/course.controller");
const student = require("../controllers/student.controller");
module.exports = app => {
    const route = require('express').Router();

    route.post("/course", create_approved_course.create)
    route.put("/course/:id", create_approved_course.update)
    route.delete("/course/:id", create_approved_course.delete)
    route.get("/courses", create_approved_course.getCourses)
    route.get("/course/:id", create_approved_course.getCourseById)

    route.get("/students",student.getStudents)
    route.get("/student/:id",student.getStudentById)



    app.use(route)
}