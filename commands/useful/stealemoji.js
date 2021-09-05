const { Util } = require("discord.js")
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: 'stealemoji',
    aliases: ['get-emoji', 'getemoji', 'steal-emoji'],
    // aliases: '',
    description: 'steal boi',
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;

        if(!message.member.permissions.has("ADMINISTRATOR")){
            const permembed = new Discord.MessageEmbed()
            .setAuthor(`You doesn't have permission to Administrator`, user.displayAvatarURL({dynamic: true}))
            .setColor('RED')
            return message.channel.send({ embeds: [permembed] })
        }

        if(!args.length){
            const argsembed = new Discord.MessageEmbed()
            .setAuthor(`Please specify some emojis!`, user.displayAvatarURL({dynamic: true}))
            .setColor('RED')
            return message.channel.send({ embeds: [argsembed] })
        }

        let descemoji = [];

        for(const rawEmoji of args){
            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if(parsedEmoji.id) {

                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id +
                    extension}`;
                message.guild.emojis.create(url, parsedEmoji.name)
            }

            descemoji.push(rawEmoji)
        }
        let successembed = new Discord.MessageEmbed()
        .setAuthor(`Successfully added to ${message.guild.name}`, user.displayAvatarURL({dynamic: true}))
        .setDescription(`${descemoji.join(" ")}`)
        .setColor(roleColor(message))
        message.channel.send({ embeds: [successembed] })
    }
}