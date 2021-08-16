const express = require('express');
const multer = require('multer');
const crypto = require('crypto');

const {CustomStorage} = require('../../config/storage_engine');

var storage = CustomStorage({
    destination: function(req, file, cb){
        cb(null, './save/images/',)

    },
    filename: function(req, file, cb){
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex')+'.'+file.originalname.split('.').pop());
        });
    }
})

exports.uploadImage = multer({storage: storage});





