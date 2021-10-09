const moment = require('moment');

module.exports = {
    name: "whois",
    aliases: ['who'],
    description: "Returns user information",
    category: ['Guild'],
    async execute(client, message, args, cmd, Discord) {
        let member
        
        if(message.mentions.users.first()){
            member = message.guild.members.cache.find(user => user.id === `${message.mentions.users.first().id}`)
        } else {
            member = message.member
        }

        // User variables
        const created = moment(member.user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
        const joined = moment(member.joinedAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
        let memberavatar = member.user.displayAvatarURL({ dynamic: true })

        const user = `<@${member.id}>`

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag}`, memberavatar)
            .setThumbnail(memberavatar)
            .setDescription(user)
            .setColor(member.displayHexColor)
            //fields
            .addField(`User ID`, `${member.id}`)
            .addField(`Created on Discord`, created)
            .addField(`Joined to ${message.guild.name}`, joined)
            .addField(`Highest Role`, `${member.roles.highest}`)
            //colm
            

        message.channel.send({ embeds: [embed] });


    }
}