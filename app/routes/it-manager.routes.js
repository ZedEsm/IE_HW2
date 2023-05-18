const route = require('express').Router();
const createStudent = require('../controllers/student.controller')
const createProfessor = require('../controllers/professor.controller')
const createEducationalManager = require('../controllers/educational-manager.controller')
const authenticateUser = require('../middelwares/auth/authonticateToken')
const authenticateAdmin = require('../middelwares/auth/authenticateAdmin')
const createAdmin = require('../controllers/it-manager.controller')
module.exports = app => {

    route.post("/admin",createAdmin.create)

    route.post("/admin/student" ,[authenticateUser.authenticate,authenticateAdmin.authenticate],createStudent.create)
    route.put("/admin/student/:id",[authenticateUser.authenticate,authenticateAdmin.authenticate], createStudent.update)
    route.delete("/admin/student/:id", [authenticateUser.authenticate,authenticateAdmin.authenticate],createStudent.delete)
    route.get("/admin/students",[authenticateUser.authenticate,authenticateAdmin.authenticate], createStudent.getStudents)
    route.get("/admin/student/:id",[authenticateUser.authenticate,authenticateAdmin.authenticate], createStudent.getStudentById)

    route.post("/admin/Professor",[authenticateUser.authenticate,authenticateAdmin.authenticate], createProfessor.create)
    route.put("/admin/Professor/:id", [authenticateUser.authenticate,authenticateAdmin.authenticate],createProfessor.update)
    route.delete("/admin/Professor/:id",[authenticateUser.authenticate,authenticateAdmin.authenticate], createProfessor.delete)
    route.get("/admin/Professors", [authenticateUser.authenticate,authenticateAdmin.authenticate],createProfessor.getProfessors)
    route.get("/admin/Professor/:id",[authenticateUser.authenticate,authenticateAdmin.authenticate], createProfessor.getProfessorById)

    route.post("/admin/manager",[authenticateUser.authenticate,authenticateAdmin.authenticate], createEducationalManager.create)
    route.put("/admin/manager/:id",[authenticateUser.authenticate,authenticateAdmin.authenticate], createEducationalManager.update)
    route.delete("/admin/manager/:id",[authenticateUser.authenticate,authenticateAdmin.authenticate], createEducationalManager.delete)
    route.get("/admin/managers",[authenticateUser.authenticate,authenticateAdmin.authenticate], createEducationalManager.getEducationalManager)
    route.get("/admin/manager/:id",[authenticateUser.authenticate,authenticateAdmin.authenticate], createEducationalManager.getEducationalManagerById)
    // '/api/posts',
    app.use( route)
}