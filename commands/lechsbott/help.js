const { PREFIX } = require("../util/lechsbottUtil")

module.exports = {
    name: "help",
    cooldown: 5,
    description: "welcome to the lab",
    category: ['lechsbott'],
    async execute(client, message, args, cmd, Discord) {

        if(!args[0]){
            let botpp = client.user.displayAvatarURL()

            let cmds = []
            client.commands.each(cmd => cmds.push(cmd.name))

            let helpembed = new Discord.MessageEmbed()
            .setAuthor(`lechsbott/help/menu`, `${botpp}`)
            .setDescription(`${cmds.join("\n")}`)
            
            .setTimestamp()
            message.channel.send({ embeds: [helpembed] })
        }

    }
}