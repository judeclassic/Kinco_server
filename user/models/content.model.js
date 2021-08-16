const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var contentSchema = new Schema({
    'userID': Schema.Types.ObjectId,
    "name": String,
    "description": String,
    "url": String,
    "views": Number,
    "likes": Number,
    "source": String,
    "createOn": {
        "type": Date,
        "default": Date.now()
    },
    "lastModified": {
        "type": Date,
        "default": Date.now()
    },
});

module.exports = mongoose.model('content', contentSchema)