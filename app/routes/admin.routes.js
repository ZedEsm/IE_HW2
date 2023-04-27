module.exports = app => {
    const route = require('express').Router();
    const createStudent = require('../controllers/student.controller')

    route.post("/admin/student", createStudent.create)
    route.put("/admin/student/:id", createStudent.update)
    route.delete("/admin/student/:id",createStudent.delete)
    route.get("/admin/students",createStudent.getStudents)
    route.get("/admin/student/:id",createStudent.getStudentById)


    app.use('/api/posts', route)
}