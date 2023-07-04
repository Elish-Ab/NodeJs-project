const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const user = require('../controllers/users');

// fancy routing
router.route('/register')
    .get(user.renderRegisterForm)
    .post(catchAsync(user.register))

router.route('/login')
    .get(user.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login)

router.get('/logout', user.logout);



module.exports = router;