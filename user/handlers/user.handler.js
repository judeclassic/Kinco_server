const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const userModel = require('../models/user.model');

exports.signUp = (req, res)=>{
    
    var user = userModel({
        "name": {
            "firstname": req.body.firstName,
            "surname": req.body.surName,
        },
        "username": req.body.userName,
        "email": req.body.email,
        "password": req.body.password
    });

    user.save()
    .then((result)=>{
        console.log(result);
        res.json("Signed Successfully");
    })
    .catch((err)=>{
        res.json(err);
        console.log(err);
    })
}

exports.login = (req, res)=>{
    userModel.findOne(
        {"email": req.body.email},
        (err, result)=>{
            if (err) console.log(err);
            
            if (result){
                if (result.comparePassword){
                    res.status(200).json({
                        "id": result._id,
                        "token": jwt.sign(
                            {
                                "_id" : result._id
                            },
                            config.jwt.key,
                        )
                    });
                }else{
                    res.status(403).json('Incorrect Password');
                }
            }else{
                res.status(403).json("email has not been registered");
            }
        }
    );

}

exports.verifyEmail = {

}

exports.home = (req, res)=>{
    userModel.findById(
        req.body.userID,
        (err, result)=>{
            if (err) res.json(err);
            console.log(result);
            if (result){
                res.json({
                    "firstname": result.name.firstname,
                    "surname": result.name.surname,
                    "username": result.username,
                    "email": result.email,
                    "createdOn": result.createdOn,
                    "lastLogin": result.lastLogin,
                    "subscribed": result.subscribed,
                    "courses": result.courses,
                });
            }else{
                res.status(401).json("Error with userID");
            }
            
        }
    );
}

exports.update = (req, res)=>{
    userModel.findByIdAndUpdate(
        req.body.userID,
        req.body.data,
        (err, result)=>{
            if (err) res.json(err);
            res.json("Updated succesfully")
        }
    )
}