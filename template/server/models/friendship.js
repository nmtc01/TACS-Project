const mongoose = require('mongoose');

// #SCHEMA
const friendshipSchema = new mongoose.Schema({
    id: { type: Number },
    friend1: { type: Number },
    friend2: { type: Number }
});

const Friendship = mongoose.model('Friendship', friendshipSchema);

exports.Friendship = Friendship;