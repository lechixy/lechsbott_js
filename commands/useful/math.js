const math = require("mathjs")

module.exports = {
    name: 'math',
    aliases: 'domath',
    description: 'maths maths maths',
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;

        try {
            let result = new Discord.MessageEmbed()
            .addField(`Question`, args.join(" "), true)
            .addField(`Answer`, math.evaluate(args.join(" ")), true)
            message.channel.send({ embeds: [result] })
        } catch(e) {
            let errorembed = new Discord.MessageEmbed()
            .setAuthor(`Question is not valid!`, user.displayAvatarURL({dynamic: true}))
            .setDescription(`**${args.join(" ")}**`)
            message.channel.send({ embeds: [errorembed] })
        }
    }
}