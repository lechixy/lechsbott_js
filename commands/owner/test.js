const { lechsPlayer } = require('../music/utils/lechsPlayer')
const { confirmation } = require('../util/lechs_confirm')
const { roleColor } = require('../util/lechsbottFunctions')
const Canvas = require('canvas')

module.exports = {
    name: 'test',
    ownerOnly: true,
    category: ['Owner'],
    async execute(client, message, args, cmd, Discord) {


        let bg = await Canvas.loadImage(`${message.author.displayAvatarURL({size: 1024, format: 'png' })}`)
        const canvas = Canvas.createCanvas(1024, 1024);
        const ctx = canvas.getContext(`2d`);
        ctx.drawImage(bg, 0, 0, 1024, 1024);
        
        let effect = await Canvas.loadImage('./images/love.png')
        ctx.drawImage(effect, 0, 0, canvas.width, canvas.height)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${client.user.username}_love.png`);
        message.channel.send({ files: [attachment] });

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