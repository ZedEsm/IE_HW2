const authenticateUser = require("../midelware/authonticateToken");
module.exports = app => {
    const route = require('express').Router();
    const createStudent = require('../controllers/student.controller')
    const createProfessor = require('../controllers/professor.controller')
    const createEducationalManager = require('../controllers/educational-manager.controller')
    const authenticateUser = require('../midelware/authonticateToken')



    //route.route("/admin/student/:id")
    route.post("/admin/student" ,[authenticateUser.authenticate],createStudent.create)
    route.put("/admin/student/:id",[authenticateUser.authenticate], createStudent.update)
    route.delete("/admin/student/:id", [authenticateUser.authenticate],createStudent.delete)
    route.get("/admin/students",[authenticateUser.authenticate], createStudent.getStudents)
    route.get("/admin/student/:id",[authenticateUser.authenticate], createStudent.getStudentById)

    route.post("/admin/Professor",[authenticateUser.authenticate], createProfessor.create)
    route.put("/admin/Professor/:id", [authenticateUser.authenticate],createProfessor.update)
    route.delete("/admin/Professor/:id", createProfessor.delete)
    route.get("/admin/Professors", createProfessor.getProfessors)
    route.get("/admin/Professor/:id", createProfessor.getProfessorById)

    route.post("/admin/manager", createEducationalManager.create)
    route.put("/admin/manager/:id", createEducationalManager.update)
    route.delete("/admin/manager/:id", createEducationalManager.delete)
    route.get("/admin/managers", createEducationalManager.getEducationalManager)
    route.get("/admin/manager/:id", createEducationalManager.getEducationalManagerById)





    app.use('/api/posts', route)
}