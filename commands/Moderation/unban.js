const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: 'unban',
    aliases: ['pardon'],
    description: 'Unbans member from the server',
    category: ['Moderation'],
    arguments: `<UserID>`,
    userPerms: ['BAN_MEMBERS',],
    clientPerms: ['BAN_MEMBERS',],
    async execute(client, message, args, cmd, Discord) {

        const id = args[0]
        if (!id) {
            let notembed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setAuthor(`You need to provide an id want to unban!`, user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Cannot unban an user without id`)
                .addField(`Usage`, `${PREFIX}${cmd} <banned user id>`)
            return message.channel.send({ embeds: [notembed] })
        }

        return unbanUser(message, id, args)
    }
}

function unbanUser(message, member, args) {

    const Discord = require('discord.js')

    message.guild.members.unban(member).then(user => {
        let succesembed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setDescription(`**${user.tag}** is now unbanned from **${message.guild.name}**`)
        message.channel.send({ embeds: [succesembed] })
    }).catch(err => {


        let notembed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setTitle(`${args[0]} is not banned!`)
            .setDescription(`We cannot found, please sure entered correctly id`)
        return message.channel.send({ embeds: [notembed] })
    })
    
}