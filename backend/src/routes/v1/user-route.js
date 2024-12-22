const express = require('express');
const {UserController} = require('../../controllers')
const {UserMiddleware} = require('../../middlewares')
const router = express.Router();


router.post('/user/signup', UserMiddleware.validateUser ,UserController.signUp);

router.post('/user/signin', UserController.signin);

module.exports = router;



