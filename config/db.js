const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://OlhaHr:Hathor777@cluster001.bq7qhp9.mongodb.net/?retryWrites=true&w=majority')
 .then (() => {
    console.log('DB connect')
 })
 .catch (err => {
    throw err
 })