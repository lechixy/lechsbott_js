const Canvas = require('canvas')

const { Command } = require('../../lechs_modules/Command/index')

module.exports = new Command({
    name: "hearty",
    description: "Give a hearty effect your avatar or other peoples!",
    category: ["Fun"],
    arguments: "<@User | none>",
    async execute({ client, message, args, cmd, Discord }) {

        let user
        if (message.mentions.members.first()) {
            user = message.mentions.members.first()
        } else {
            user = message.member
        }

        let bg = await Canvas.loadImage(`${user.displayAvatarURL({ size: 600, format: 'png' })}`)
        const canvas = Canvas.createCanvas(600, 600);
        const ctx = canvas.getContext(`2d`);
        ctx.drawImage(bg, 0, 0, 600, 600);


        let effect = await Canvas.loadImage('./images/heart.png')
        ctx.drawImage(effect, 600 / 4, 0, 300, 300)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${client.user.username}_love.png`);
        message.channel.send({ files: [attachment] });


    }
})