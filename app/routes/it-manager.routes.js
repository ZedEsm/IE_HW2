module.exports = app => {
    const route = require('express').Router();
    const createStudent = require('../controllers/student.controller')
    const createProfessor = require('../controllers/professor.controller')
    const createEducationalManager = require('../controllers/educational-manager.controller')


    //route.route("/admin/student/:id")
    route.post("/admin/student" ,createStudent.create)
    route.put("/admin/student/:id", createStudent.update)
    route.delete("/admin/student/:id", createStudent.delete)
    route.get("/admin/students", createStudent.getStudents)
    route.get("/admin/student/:id", createStudent.getStudentById)

    route.post("/admin/Professor", createProfessor.create)
    route.put("/admin/Professor/:id", createProfessor.update)
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