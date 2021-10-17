const Voice = require('@discordjs/voice')

class lechsPlayer{
    constructor(guildId){
        this.guildId = guildId;
    }
    player(){
        let voicechannel = Voice.getVoiceConnection(this.guildId);
        return voicechannel._state.subscription.player
    }
}

exports.lechsPlayer = lechsPlayer;