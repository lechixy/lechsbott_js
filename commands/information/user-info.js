const moment = require('moment');

module.exports = {
    name: "whois",
    cooldown: '0',
    aliases: ["who", "user", "info", "user-info", "infos", "kim", "kimbu"],
    description: "Returns user information",
    async execute(client, message, args, cmd, Discord) {
        const member = message.mentions.users.first() || message.author;
        let memberavatar = member.displayAvatarURL({dynamic: true})
        // User variables
        const created = moment(member.createdAt).format('DD/MM/YY');

        const embed = new Discord.MessageEmbed()

            .setAuthor(`${member.username}'s Profile`, `${memberavatar}`)

            .setThumbnail(`${memberavatar}`)

            .addField('User Information',
            `Username: ${member.tag}
            Created at: ${created}`)

            .addField('Advanced information', 
            `ID: ${member.id}
            Is bot: ${member.bot}`)
            
            .setTimestamp()

            .addField('Currently',
            `Status: ${member.presence.status}`)

        message.channel.send({ embeds: [embed] });
    }
}