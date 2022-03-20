const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users')

router.get('/register', users.newUserForm)

router.post('/register', users.createUser)

// Login
router.get('/login', users.loginForm)

// Authentication part is passed a middleware that is available through passport.authenticate
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;