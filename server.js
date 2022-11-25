const express = require ('express');
const session = require('express-session');

const app = express();
require('./config/db');
const route = require('./config/route');

app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))

app.use(session({
    secret: 'random session text in node js',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(route);

app.listen(0000, ()=> console.log('port start on 0000'))