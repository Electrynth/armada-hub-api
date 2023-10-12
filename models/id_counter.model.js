const mongoose = require('mongoose');

const IdCounterSchema = mongoose.Schema({
    count: { type: Number, required: true },
    field: { type: String, required: true },
    collectionName: { type: String, required: true }
}, { minimize: false });


module.exports = mongoose.model('id_counter', IdCounterSchema);