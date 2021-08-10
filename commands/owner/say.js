module.exports = {
    name: "say",
    cooldown: '0',
    desciption: "say command",
    aliases: ["repeat", "tekraret", "ram"],
    ownerOnly: true,
    async execute (client, message, args, cmd, Discord) {
        let msg;
        let textChannel = message.mentions.channels.first()

        if(!args[0]){
            return message.channel.send({ content: `Hmm need to somethings to send.` })
        }

        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
    }
}