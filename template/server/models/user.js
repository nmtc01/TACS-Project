const mongoose = require('mongoose');

// #SCHEMA -> TODO
const userSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    address: { type: String }
});

const User = mongoose.model('User', userSchema);

exports.User = User;