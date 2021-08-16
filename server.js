const express = require('express');
const path = require('path');

const config = require('./config/config');
const userRoute = require('./user/routes/user.route')

require('./config/db')();

var port  = config.server.port || process.env.port;

var app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use('/file', express.static('./save/images'));

app.use(express.json());

app.use('/user', userRoute);

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})