const AppErrors = require('../utils/error/app-errors');
const UserRepository = require('../repository/user-repository');
const { default: mongoose } = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const {Auth}= require('../utils/common');
const {ServerConfig} = require('../config');
const userRepo = new UserRepository();



async function createUser(data){
    try {
        const user = await userRepo.create(data);
            return user;
    } catch (error) {
        let explaination = [];
    
       if(error instanceof mongoose.Error.ValidationError){
        // check the moongoseError and validation errors from Mongoose, maps each field's error (email, password) into a structured object with field and message, and stores them in an array called explaination
        Object.values(error.errors).map(err => {
            const result = {
                field: err.path,
                message:err.message
            };
            return explaination.push(result);
        })

        throw new AppErrors(explaination, StatusCodes.BAD_REQUEST);
      
       }

       // Duplicate Value
       if(error.name == 'MongoServerError' && error.errorResponse.code == 11000){ 
       throw new AppErrors('Duplicate email found. Please enter unique email', StatusCodes.CONFLICT);
       }
      
       
        throw new AppErrors("Something went wrong in the User-service: createUser", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}


async function signIn(data){
    try {
        const user = await userRepo.getUserByEmail(data.email);
        console.log(user);
        if(!user){
            throw new AppErrors("user is not found for given email", StatusCodes.BAD_REQUEST)
        }
        
        const userPassword = data.password;
        const encryptPassword = user.password;
        const isPasswordMatch = Auth.checkPassword(userPassword,encryptPassword);
       
        if(!isPasswordMatch){
            throw new AppErrors("Password is mismatched", StatusCodes.BAD_REQUEST);
        }

        const jwtToken = Auth.createToken({id:user.id}, ServerConfig.SECRET_KEY, {expiresIn:ServerConfig.EXPIRE_IN});

        return jwtToken;
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

async function isAuthenicated(token){
    try {
       if(!token){
        throw new AppErrors('JWT token is missing', StatusCodes.BAD_REQUEST);
       }
       const response = Auth.verifyToken(token,ServerConfig.SECRETKEY);
     
       const user = await userRepo.get(response.id.id);
       if(!user){
        throw new AppErrors("user is not found", StatusCodes.BAD_REQUEST);
       }
       return user.id;

        } catch (error) {
            console.log(error);
        if(error.name == 'JsonWebTokenError'){
            throw new AppErrors('Invaild JWT Token', StatusCodes.BAD_REQUEST);
        }
        if(error.name =="TokenExpiredError"){
            throw new AppErrors('JWT token Expired',StatusCodes.UNAUTHORIZED);
        }
        throw error;
    }
}


module.exports={
    createUser,
    signIn,
    isAuthenicated
   
}