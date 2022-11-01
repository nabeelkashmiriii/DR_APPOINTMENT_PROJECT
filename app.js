const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConn = require('./APP/Config/dbConn');
const userRoute = require('./APP/Routes/userRoute');



const app = express();

DATABASE_URL = process.env.DATABASE_URL;
// calling function from config to connect database
dbConn(DATABASE_URL);

// middlware for json api
app.use(express.json());

// loading routes
app.use('/index/user', userRoute)

app.listen(process.env.PORT, ()=>{
    console.log(`server is Listening... ${process.env.PORT}`);
});