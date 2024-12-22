const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

function checkPassword(plain,hash){
    return bcrypt.compareSync(plain,hash);
}

function createToken(id,serectKey,expiry){
    return jwt.sign({id:id},serectKey,expiry);
}



module.exports={
    checkPassword,
    createToken
}