const moment = require('moment');

module.exports = {
    name: "whois",
    aliases: ['who', 'user'],
    description: "Returns user information",
    async execute(client, message, args, cmd, Discord) {
        const member = message.mentions.users.first() || message.author;

        // User variables
        const created = moment(member.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
        const joined = moment(member.joinedAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
        let memberavatar = member.displayAvatarURL({ dynamic: true })

        let memroles = []

        const memberRoles = member.roles.cache
            .filter((roles) => roles.id !== message.guild.id)
            .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
            .map((role) => {
                memroles.push(role)
            });

        const user = `<@${member.id}>`

        let userstatus = {
            "online": "Online",
            "idle": "Idle",
            "dnd": "Do Not Disturb",
            "offline": "Offline",
        }


        const embed = new Discord.MessageEmbed()
            .setAuthor(`About ${member.user.tag}`, memberavatar)
            .setDescription(memberRoles)
            //fields
            .addField(`User`, user, true)
            .addField(`Created`, created, true)
            .addField(`Joined`, joined, true)
            //colm
            .addField(`Currently`, userstatus[member.presence.status], true)

        message.channel.send({ embeds: [embed] });


    }
}