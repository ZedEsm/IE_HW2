const route = require('express').Router();
const user_route = require('../controllers/user.controller')
const authenticate_student = require('../midelware/auth/authenticateStudent')
const authenticate_user = require("../midelware/auth/authonticateToken");

module.exports = app =>{
    route.put("/student/:id",[authenticate_user.authenticate,authenticate_student.authenticate],user_route.updateField)
    app.use(route)
}