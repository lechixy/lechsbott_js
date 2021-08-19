const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: { type: String },
    voice_channel: { type: String },
    text_channel: { type: String },
    player: { type: Object },
    connection: { type: Object },
    songs: { type: [Object] },
    volume: { type: String },
    playing: { type: Boolean },
})

module.exports = mongoose.model('player', Schema)