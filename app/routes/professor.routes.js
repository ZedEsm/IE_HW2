const route = require('express').Router();
const professor_route = require('../controllers/user.controller');
const authenticate_user = require("../middelwares/auth/authonticateToken");
const authenticate_professor = require("../middelwares/auth/authenticateProfessor")

module.exports = app =>{
    route.put("/professor/:id",[authenticate_user.authenticate,authenticate_professor.authenticate],professor_route.updateField)
    app.use(route)
}