const express = require('express');

const contentHandler = require('../handlers/content.handler');
const authHandler = require('../handlers/auth.handler');
const {uploadImage} = require('../handlers/file.handler');

var router = express.Router();

router.route('/post').post(uploadImage.single('image'), authHandler.user, contentHandler.postContent);

router.route('/requestPosts').post(authHandler.user, contentHandler.requestContents);

router.route('/update').post(authHandler.user, contentHandler.updateContent);

module.exports = router;