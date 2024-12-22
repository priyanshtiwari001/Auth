const dotenv = require('dotenv');

dotenv.config();
console.log(process.env);
module.exports={
    PORT: process.env.PORT,
    EXPIRE_IN: process.env.EXPIRE_IN,
    SECRET_KEY:process.env.SECRET_KEY

}