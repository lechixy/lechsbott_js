module.exports = {
    name: "say",
    cooldown: '0',
    desciption: "say command",
    aliases: ["repeat", "tekraret", "ram"],
    async execute (client, message, args, cmd, Discord) {
        const { OWNER1 } = require("../util/lechsbottUtil");
        const { OWNER2 } = require("../util/lechsbottUtil");

        if(message.author.id == OWNER1 || message.author.id == OWNER2) {
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