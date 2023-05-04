module .exports = app => {
    const route = require('express').Router();
    const login_user_controller = require('../controllers/login.controller');

    route.post('/login',login_user_controller.checkLogin)

    app.use(route)
}