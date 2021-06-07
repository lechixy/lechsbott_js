const moment = require('moment');

module.exports = {
    name: "whois",
    cooldown: '0',
    aliases: ["who", "user", "info", "user-info", "infos", "kim", "kimbu"],
    description: "Returns user information",
    async execute(client, message, args, cmd, Discord) {
        const member = message.mentions.users.first() || message.author;
        let memberavatar = member.displayAvatarURL()
        // User variables
        const created = moment(member.createdAt).format('DD/MM/YY');

        const embed = new Discord.MessageEmbed()
            .setColor('FF0000')

            .setAuthor(`${member.username}'s Profile`, `${memberavatar}`)

            .setImage(`${memberavatar}`)

            .addField('User Information',
            `Username: ${member.tag}
            ID: ${member.id}
            Created at: ${created}`)

            .addField('Advanced information', 
            ``, true)
            
            .setTimestamp()
            .setFooter('lechsbott')

            .addField('Currently',
            `Status: ${member.presence.status}
             Type: ${member.presence.type}
             Name: ${member.presence.name}
             Elapsed: ${member.presence.timestampsStart}`)

            .addField('Profile Picture', `of ${member.username}`);

        message.channel.send(embed);
    }
}