const math = require("mathjs")

module.exports = {
    name: 'math',
    aliases: 'domath',
    description: 'maths maths maths',
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;

        try {
            let result = new Discord.MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
            .addField(`Question`, process, true)
            .addField(`Solution`, `${math.evaluate(process)}`, true)
            message.channel.send({ embeds: [result] })
        } catch(e) {
            console.log(e)
            let errorembed = new Discord.MessageEmbed()
            .setAuthor(`Question is not valid!`, user.displayAvatarURL({dynamic: true}))
            .setDescription(`**${process}**`)
            message.channel.send({ embeds: [errorembed] })
        }
    }
}