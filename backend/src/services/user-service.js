const AppErrors = require('../utils/error/app-errors');
const UserRepository = require('../repository/user-repository');
const { default: mongoose } = require('mongoose');
const { StatusCodes } = require('http-status-codes');

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
       throw new AppErrors('Duplicate key found. Please enter unique value', StatusCodes.BAD_REQUEST);
       }
      
       
        throw new AppErrors("Something went wrong in the User-service: createUser", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}


async function getUser(data){
    try {
        const user = await userRepo.get(data);
    return user;
    } catch (error) {
        console.log(error);
        
    }
}




module.exports={
    createUser,
    getUser
}