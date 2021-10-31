const { Command } = require('../../lechs_modules/Command/index')

module.exports = new Command({
    name: "say",
    aliases: ["echo"],
    ownerOnly: true,
    category: ['Owner'],
    async execute ({client, message, args, cmd, Discord}) {
        let msg;
        let textChannel = message.mentions.channels.first()

        if(!args[0]){
            return message.channel.send({ content: `Hmm need to somethings to send.` })
        }

        message.delete()

        if(textChannel && textChannel.type === "GUILD_TEXT") {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
    }
})