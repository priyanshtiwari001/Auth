const express = require('express');
const {UserController} = require('../../controllers')
const {UserMiddleware} = require('../../middlewares')
const router = express.Router();


router.post('/signup', UserMiddleware.validateUser ,UserController.signUp);

router.get('/user/:id', UserController.getUser);

module.exports = router;


