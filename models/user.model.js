const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    settings: mongoose.Schema.Types.Mixed
}, { minimize: false });

module.exports = mongoose.model('users', UserSchema);