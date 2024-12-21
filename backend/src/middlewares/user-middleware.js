const { StatusCodes } = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppErrors = require('../utils/error/app-errors');

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


module.exports= {
    validateUser
};