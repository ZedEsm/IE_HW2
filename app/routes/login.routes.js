module .exports = app => {
    const jwt = require('jsonwebtoken');
    const route = require('express').Router();
    let login_user_controller = require('../controllers/login.controller');

    route.post('/login',login_user_controller.checkLogin)

    app.use(route)
}