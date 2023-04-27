module.exports = app => {
    const route = require('express').Router();
    const createStudent = require('../controllers/student.controller')
    const createProfessor= require('../controllers/professor.controller')

    route.post("/admin/student", createStudent.create)
    route.put("/admin/student/:id", createStudent.update)
    route.delete("/admin/student/:id",createStudent.delete)
    route.get("/admin/students",createStudent.getStudents)
    route.get("/admin/student/:id",createStudent.getStudentById)

    route.post("/admin/Professor", createProfessor.create)
    // route.put("/admin/Professor/:id", createProfessor.update)
    // route.delete("/admin/Professor/:id",createProfessor.delete)
    // route.get("/admin/Professors",createProfessor.getProfessors)
    // route.get("/admin/Professor/:id",createProfessor.getProfessorById)


    app.use('/api/posts', route)
}