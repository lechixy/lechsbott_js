const Voice = require('@discordjs/voice')

/** 
 * @param {Voice.AudioPlayer} lechsPlayer.player()
 */

class lechsPlayer{
    constructor(guildId){
        this.guildId = guildId;
        this.channel = Voice.getVoiceConnection(this.guildId);
    }
    player(){
        return this.channel._state.subscription.player
    }
    subscription(){
        return this.channel._state.subscription
    }
    connection(){
        return this.channel
    }
}

exports.lechsPlayer = lechsPlayer;