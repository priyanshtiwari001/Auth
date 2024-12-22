const express = require('express');
const v1Route = require('./routes')
const {ConnectDB} = require('./config');
const UserRepository = require('./repository/user-repository');
const userRepo = new UserRepository();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api',v1Route);


app.listen(3000, async ()=>{
    console.log('Port is successfully running in 3000');
    await ConnectDB();
    console.log("DB Connected");
   
    
    
})


