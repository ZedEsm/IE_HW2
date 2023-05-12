const route = require('express').Router();
const studentRoutes = require('../controllers/student.controller')
const authenticateStudent = require('../midelware/auth/authenticateStudent')
const authenticateUser = require("../midelware/auth/authonticateToken");

module.exports = app =>{
    route.put("/student/:id",[authenticateUser.authenticate,authenticateStudent.authenticate],studentRoutes.updateField)
    app.use(route)
}