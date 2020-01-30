const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const md5 = require('md5');

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('User', userSchema);