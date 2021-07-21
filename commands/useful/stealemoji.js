const { Util } = require("discord.js")

module.exports = {
    name: 'stealemoji',
    // aliases: '',
    description: 'steal boi',
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;

        if(!message.member.hasPermission("ADMINISTRATOR")){
            const permembed = new Discord.MessageEmbed()
            .setAuthor(`You doesn't have permission to Administrator`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(permembed)
        }

        if(!args.length){
            const argsembed = new Discord.MessageEmbed()
            .setAuthor(`Please specify some emojis!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(argsembed)
        }

        for(const rawEmoji of args){
            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if(parsedEmoji.id) {

                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id +
                    extension}`;
                message.guild.emojis.create(url, parsedEmoji.name)
            }
        }
        let successembed = new Discord.MessageEmbed()
        .setAuthor(`Successfully added to ${message.guild.name}`, user.displayAvatarURL({dynamic: true}))
        .setDescription(`${args.join(" ")}`)
        message.channel.send(successembed)
    }
}