const { lechsPlayer } = require('../music/utils/lechsPlayer')
const { confirmation } = require('../util/lechs_confirm')
const { roleColor } = require('../util/lechsbottFunctions')
const Canvas = require('canvas')

const { Command } = require('../../lechs_modules/Command/index')

module.exports = new Command({
    name: "test",
    description: "An test command for owners",
    ownerOnly: true,
    category: ["Owner"],
    async execute({client, message, args, cmd, Discord}) {
        
        return

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
})