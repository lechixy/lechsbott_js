const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    serverId: { type: String, required: true, unique: true },
    channelId: { type: String, required: true, unique: true },
    lastVidUrl: { type: String, required: true },
    notifymessage:{ type: String },
})

const model = mongoose.model("servermodels", serverSchema)

module.exports = model;