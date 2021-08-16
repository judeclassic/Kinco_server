const jwt = require('jsonwebtoken');

const config = require('../../config/config');


exports.user = function(req, res, next){
    console.log(req.body);
    try{
        var auth = jwt.verify(req.headers.authentication, config.jwt.key, {
            complete: true
        });
        if (auth.payload._id == req.body.userID){
            next();
        }else{
            throw err;
        }
    }catch(err){
        res.json({"message": "Authentication failed", "errorMessage": err});
    }
    
}