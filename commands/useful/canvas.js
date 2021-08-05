const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'canvas',
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        var fs = require('fs')
        var Canvas = require('canvas')

        const canvas = Canvas.createCanvas(500, 500)
        const ctx = canvas.getContext('2d')

        const background = Canvas.loadImage('https://w.wallha.com/ws/12/Ix3doEQL.png')

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = '#ffffff'

        const final = new Discord.MessageAttachment(canvas.toBuffer(), "userinfo.png")
        
        return message.channel.send({ files: [final] })
  }
}