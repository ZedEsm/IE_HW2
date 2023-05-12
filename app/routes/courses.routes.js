const course = require("../controllers/course.controller");
const authenticateUser = require('../middelwares/auth/authonticateToken')
const authenticateCoursesAccess = require("../middelwares/auth/authenticateCourses")
module.exports = app => {
    const route = require('express').Router();
    route.get("/courses",[authenticateUser.authenticate,authenticateCoursesAccess.authenticate],course.getCourses)
    route.get("/course/:id",[authenticateUser.authenticate,authenticateCoursesAccess.authenticate], course.getCourseById)

    app.use(route)
}
