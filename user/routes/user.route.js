const express = require('express');

const userHandler = require('../handlers/user.handler');
const authHandler = require('../handlers/auth.handler');
const contentRoute = require('../routes/content.route');

var router = express.Router();

router.route('/').get((req, res)=>{
    res.json('yes sir');
});

router.route('/login').post(userHandler.login);

router.route('/signup').post(userHandler.signUp);

router.route('/').post(authHandler.user, userHandler.home);

router.route('/update').post(authHandler.user, userHandler.update)

router.use('/content', contentRoute);

module.exports = router;