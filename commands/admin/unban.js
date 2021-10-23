const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: 'unban',
    aliases: ['pardon'],
    description: '',
    async execute(client, message, args, cmd, Discord) {

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            let permembed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**You need to** \`Ban Members\` **permission to unban a member!**`)
            return message.channel.send({ embeds: [permembed] })
        }

        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**Lechsbott needs to** \`Ban Members\` **permission to unban a member!**`)
            return message.channel.send({ embeds: [embed] });
        }

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