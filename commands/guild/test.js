const { lechsPlayer } = require('../music/utils/lechsPlayer')
const { confirmation } = require('../util/lechs_confirm')

module.exports = {
    name: 'test',
    description: '',
    async execute(client, message, args, cmd, Discord) {


        // const cls = new lechsPlayer(message.guild.id)
        // console.log(cls.player().pause())

        // const Voice = require('@discordjs/voice')
        // const voice_channel = message.member.voice.channel

        // let player = Voice.getVoiceConnection(message.guild.id)
        
        // try {
        //     player._state.subscription.player.unpause()
        // } catch (err) {
        //     console.log(err)
        // }

    }
}