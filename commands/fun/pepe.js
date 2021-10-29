const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')
const Canvas = require('canvas')

module.exports = {
    name: 'pepe',
    description: 'Sends a pepe image to channel!',
    cooldown: 5,
    category: ['Fun'],
    arguments: `<none | text to be on image>`,
    async execute(client, message, args, cmd, Discord) {

        let text = args.join(' ') || 'we lov uuu <3'

        let bg = await Canvas.loadImage("https://github.com/katie07/Imagayes/blob/main/oo.png?raw=true")
        const canvas = Canvas.createCanvas(206, 206);
        const ctx = canvas.getContext(`2d`);
        ctx.drawImage(bg, 0, 0, 206, 206);
        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#00000';
        ctx.fillText(`${text}`, canvas.width / 9.8, canvas.height / 4.0);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${client.user.username}_pepe.png`);
        message.channel.send({ files: [attachment] });

    }
}