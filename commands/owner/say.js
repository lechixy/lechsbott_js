module.exports = {
    name: "say",
    cooldown: '0',
    desciption: "say command",
    aliases: ["repeat", "tekraret", "ram"],
    async execute (client, message, args, cmd, Discord) {
        if(message.author.id == "391511241786654721" || message.author.id == "697768287286591509" || message.author.id == "590537298131681283") {
            let msg;
            let textChannel = message.mentions.channels.first()
            message.delete()

            if(textChannel) {
                msg = args.slice(1).join(" ");
                textChannel.send(msg)
            } else {
                msg = args.join(" ");
                message.channel.send(msg)
            }
        } else {
            message.channel.send(` This is an owner command, you cannot use this command!`)
        }
        

        
    }
}