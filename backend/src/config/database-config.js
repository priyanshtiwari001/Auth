const mongoose = require('mongoose');

async function connectDB(){
    try {
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/auth_db');
        return connect;
    } catch (error) {
        console.log(error);
    }

}

module.exports=connectDB;