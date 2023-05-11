const course = require("../controllers/course.controller");
const authenticateUser = require('../midelware/authonticateToken')
const authenticateCoursesAccess = require("../midelware/authenticateCourses")
module.exports = app => {
    const route = require('express').Router();
    route.get("/courses",[authenticateUser.authenticate,authenticateCoursesAccess.authenticate],course.getCourses)
    app.use(route)
}
