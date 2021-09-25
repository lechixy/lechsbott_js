const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    serverId: { type: String, required: true, unique: true },
    
})

const model = mongoose.model("servers", serverSchema)

module.exports = model;