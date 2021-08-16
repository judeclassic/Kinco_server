const mongoose = require('mongoose');

const config = require('./config')

module.exports = ()=>{
    try{
        mongoose.connect(config.db.host, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        mongoose.connection.once('open', (err)=>{
            if (err) throw err;

            console.log("connected to Database Successfully");

        });
    }catch(err){
        console.log('Unable to connect to Database');
    }
}