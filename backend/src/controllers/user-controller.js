const {UserService} = require('../services');
const {StatusCodes} = require('http-status-codes')
const {SuccessResponse,ErrorResponse} = require('../utils/common');

async function signUp(req,res){
    try {
        const response = await UserService.createUser({
            username:req.body.username,
            email: req.body.email,
            password:req.body.password
        })
        console.log("response",response);
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse); 
    } catch (error) {
        console.log(error);
       ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getUser(req,res){
    try {
        const response = await UserService.getUser(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse); 
    } catch (error) {
        if(error.errors._message == 'User validation failed'){
            ErrorResponse.error=error.errors._message;
            console.log("Value is miss mismatched. Please check again!!");
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
       
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}




module.exports={
    signUp,
    getUser
}