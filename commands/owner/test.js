const { lechsPlayer } = require('../music/utils/lechsPlayer')
const { Command } = require('../../lechs_modules/Command/index')

module.exports = new Command({
    name: "test",
    description: "An test command for owners",
    ownerOnly: true,
    category: ["Owner"],
    async execute({client, message, args, cmd, Discord}) {
        

        const cls = new lechsPlayer(message.guild.id)
        console.log(cls.connection().disconnect())

        // const Voice = require('@discordjs/voice')
        // const voice_channel = message.member.voice.channel

        // let player = Voice.getVoiceConnection(message.guild.id)

        // try {
        //     player._state.subscription.player.unpause()
        // } catch (err) {
        //     console.log(err)
        // }

    }
})