const express = require('express');
const appRoute = express.Router();
const controller = require('../controller/app');
const auth = require('../middle/auth');

appRoute.get('/',  controller.homePage);

appRoute.post('/create-new-user', controller.createNewUser)
appRoute.post('/log/user', controller.logUser)
appRoute.get('/info/:id',auth.isAuth, controller.userInfo)
appRoute.get('/logout', controller.logout)

module.exports = appRoute 
 

