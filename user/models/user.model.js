const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    "name": {
        "firstname": {
            "type": String,
            "required": true,
        },
        "surname": {
            "type": String,
        }
    },
    
    "email": {
        "type": String,
        "required": true,
        "unique": true,
    },

    "profile": {
        "image": String,
    },

    "username": {
        "type": String,
        "required": true,
        "unique": true
    },
    
    "password": {
        "type": String,
        "required": true,
    },

    "subscribed": [{
        "id": String,
        "name": String
    }],

    "content": [{
        'contentID': Schema.Types.ObjectId,
        'url': String
    }],

    "createdOn": {
        "type": Date,
        "default": Date.now()
    },
    
    "lastLogin": {
        "type": Date,
        "default": Date.now()
    }
});


userSchema.pre('save', function(next){
    var user = this;
    bcrypt.genSalt(10, (err, salt)=>{
        if (err) next(err);

        bcrypt.hash(user.password, salt, (err, hash)=>{
            this.password = hash;
            next(err);
        })
    });
});


userSchema.methods.comparePassword = (password)=>{
    return bcrypt.compare(password, this.password, (err, isValid)=>{
        if (err) return err;
        return isValid;
    });
}

userSchema.virtual('fullname').get((f)=>{
    return `${this.name.first } ${this.name.sur}`;
}).set((name)=>{
    var splittedName = name.split(' ');
    if (splittedName.length < 2){
        this.name.firstname = splittedName[0];
    }else{
        this.name.surname = splittedName[1];
    }
});

module.exports = mongoose.model('User', userSchema);