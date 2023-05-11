const create_approved_course = require("../controllers/course.controller");
const student = require("../controllers/student.controller");
const professor = require("../controllers/professor.controller")
const authenticateUser = require('../midelware/authonticateToken')
const authenticateManager = require('../midelware/authenticateManager')
module.exports = app => {
    const route = require('express').Router();

    route.post("/course",[authenticateUser.authenticate,authenticateManager.authenticate], create_approved_course.create)
    route.put("/course/:id", [authenticateUser.authenticate,authenticateManager.authenticate],create_approved_course.update)
    route.delete("/course/:id",[authenticateUser.authenticate,authenticateManager.authenticate], create_approved_course.delete)
    // route.get("/courses",[authenticateUser.authenticate,authenticateManager.authenticate], create_approved_course.getCourses)
    route.get("/course/:id",[authenticateUser.authenticate,authenticateManager.authenticate], create_approved_course.getCourseById)

    route.get("/students",[authenticateUser.authenticate,authenticateManager.authenticate],student.getStudents)
    route.get("/student/:id",[authenticateUser.authenticate,authenticateManager.authenticate],student.getStudentById)
    route.get("/professors",[authenticateUser.authenticate,authenticateManager.authenticate],professor.getProfessors)
    route.get("/professor/:id",[authenticateUser.authenticate,authenticateManager.authenticate],professor.getProfessorById)

    app.use(route)
}