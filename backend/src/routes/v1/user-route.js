const express = require('express');
const {UserController} = require('../../controllers')
const {UserMiddleware} = require('../../middlewares')
const router = express.Router();


router.post('/user/signup', UserMiddleware.validateUser ,UserController.signUp);

router.post('/user/signin', UserController.signin);

router.get('/dashboard',UserMiddleware.checkAuth, function ex(req,res){
    return res.json( {message: `Welcome ${req.user} user! Account is created successfully`});
})

module.exports = router;



