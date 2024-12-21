const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../../config');

function checkPassword(plainPassword,encryptPassword){

    return bcrypt.compareSync(plainPassword,encryptPassword);
}


function createToken(input){
    return jwt.sign(input,ServerConfig.JWT_SECRET_KEY,{expiresIn:ServerConfig.JWT_EXPIRY})
}


function verifyToken(jwtToken){
    return jwt.verify(jwtToken,ServerConfig.JWT_SECRET_KEY);
}
// module.exports={
//     checkPassword,
//     createToken,
//     verifyToken
// }