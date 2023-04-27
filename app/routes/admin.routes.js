module.exports = app => {
    const route = require('express').Router();
    const createStudent = require('../controllers/student.controller')

    route.post("/admin/student", createStudent.create)
    route.put("/admin/student/:id", createStudent.update)

    app.use('/api/posts', route)
}