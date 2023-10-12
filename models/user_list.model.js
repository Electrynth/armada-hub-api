const mongoose = require('mongoose');

const UserListSchema = mongoose.Schema({
    listId: { type: Number, required: true },
    email: { type: String, required: true },
    version: { type: Number, required: true },
    title: { type: String, required: true },
    faction: { type: String, required: true },
    commander: { type: String, required: true },
    redObjId: { type: String, required: true },
    blueObjId: { type: String, required: true },
    yellowObjId: { type: String, required: true },
    ships: { type: Array, required: true },
    squadrons: { type: Array, required: true }
}, { minimize: false });


module.exports = mongoose.model('user_lists', UserListSchema);