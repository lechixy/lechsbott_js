const mongoose = require('mongoose')

let schema = mongoose.Schema({
    userID: {  type: String, required: true, unique: true },
    timeSaid: { type: Number, required: true }
})

const model = mongoose.model("saidPrefix", schema)

module.exports = model;