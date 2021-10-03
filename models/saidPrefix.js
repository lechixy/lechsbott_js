const mongoose = require('mongoose')

let schema = mongoose.Schema({
    userID: {  type: String, required: true, unique: true },
    userTag: {  type: String, required: true },
    lastSaid: { type: Number, required: true },
    timeSaid: { type: Number, required: true }
})

const model = mongoose.model("saidPrefix", schema)

module.exports = model;