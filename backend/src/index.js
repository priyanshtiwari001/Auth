const express = require('express');
const v1Route = require('./routes')
const {ConnectDB} = require('./config');
const {ServerConfig} = require('./config')


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api',v1Route);


app.listen(ServerConfig.PORT, async ()=>{
    console.log(`Port is successfully running in ${ServerConfig.PORT}`);
    await ConnectDB();
    console.log("DB Connected");
 
    
    
})


