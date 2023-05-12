const course = require("../controllers/course.controller");
const authenticateUser = require('../midelware/auth/authonticateToken')
const authenticateCoursesAccess = require("../midelware/auth/authenticateCourses")
module.exports = app => {
    const route = require('express').Router();
    route.get("/courses",[authenticateUser.authenticate,authenticateCoursesAccess.authenticate],course.getCourses)
    route.get("/course/:id",[authenticateUser.authenticate,authenticateCoursesAccess.authenticate], course.getCourseById)

    app.use(route)
}
