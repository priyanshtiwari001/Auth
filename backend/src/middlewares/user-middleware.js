const { StatusCodes } = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppErrors = require('../utils/error/app-errors');
const { UserService } = require('../services');

async function validateUser(req,res,next){
    if(!req.body.username){
        ErrorResponse.message = "Something went wrong while authnicated the user";
        ErrorResponse.error =  new AppErrors([' username  is not found in the oncoming request in correct form!'],StatusCodes.NOT_FOUND)

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.email){
        ErrorResponse.message = "Something went wrong while authnicated the user";
        ErrorResponse.error =  new AppErrors([' email  is not found in the oncoming request in correct form!'],StatusCodes.NOT_FOUND);

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.password){
        ErrorResponse.message = "Something went wrong while authnicated the user";
        ErrorResponse.error =  new AppErrors([' password  is not found in the oncoming request in correct form!'],StatusCodes.NOT_FOUND);

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

async function checkAuth(req,res,next){
    try {
        const response = await UserService.isAuthenicated(req.headers['x-access-token']);
    if(response){
        req.user=response;
        console.log(response);
        next();
    }
  
    } catch (error) {
        return res
                .status(error.statusCode)
                .json(error);
    }
} 




module.exports= {
    validateUser,
    checkAuth
};