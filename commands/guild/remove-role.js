const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')
const { Command } = require('../../lechs_modules/Command/index')

module.exports = new Command({
    name: 'removerole',
    aliases: ['remove-role', 'role-remove'],
    description: 'Removes a role from member',
    category: ['Guild'],
    arguments: `<@User | UserID> <@Role | RoleID>`,
    userPerms: ['MANAGE_ROLES'],
    clientPerms: ['MANAGE_ROLES'],
    async execute({client, message, args, cmd, Discord}) {

        
        let user
        if (message.mentions.members.first()) {
            user = message.mentions.members.first()
        } else if (args[0]) {
            user = await message.guild.members.cache.get(args[0])
        }

        if (!user) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setTitle('Need an user to remove role from')
                .setDescription(`If you already do that probably we cannot found a guild member like that**\nAre you sure entered an user?`)
                .addField(`Usage`, `${PREFIX}${cmd} **<@User | UserID>** <@Role | RoleID>`, true)
                .setColor(roleColor(message))
            return message.channel.send({ embeds: [embed] });
        }

        let roleto
        if (message.mentions.roles.first()) {
            roleto = message.mentions.roles.first()
        } else if (args[0]) {
            user = await message.guild.roles.cache.get(args[0])
        }

        if (!roleto) {
            const embed = new Discord.MessageEmbed()
                .setTitle('Need a role to remove from user')
                .setDescription(`If you already do that probably we cannot found a role like that**\nAre you sure entered a role?`)
                .addField(`Usage`, `${PREFIX}${cmd} <@User | UserID> **<@Role | RoleID>**`, true)
                .setColor(roleColor(message))
            return message.channel.send({ embeds: [embed] });
        }

        if (!user.roles.cache.find(role => role.name === roleto.name)) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setTitle('This user has not that role')
                .setDescription(`You cannot remove a role that does not exist`)
            return message.channel.send({ embeds: [embed] });
        }
        if (roleto.managed === true) {
            const embed = new Discord.MessageEmbed()
                .setTitle('We can\'t remove this role')
                .setDescription(`This role is a managed role that means, it cannot be manually removed from members`)
                .setColor(roleColor(message))
            return message.channel.send({ embeds: [embed] });
        }

        if (message.author.id !== message.guild.ownerId && roleto.position >= message.member.roles.highest.position) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setAuthor(`Your role is lower from that member`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`You cannot remove the ${roleto} role to ${user}`)
            return message.channel.send({ embeds: [embed] });
        }
        if (roleto.position >= message.guild.me.roles.highest.position) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setAuthor(`${client.user.username} role is lower than that role`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`We cannot remove the ${roleto} role to ${user}`)
            return message.channel.send({ embeds: [embed] });
        }

        try {
            user.roles.remove(roleto)
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`Removed the ${roleto} role from ${user}`)
            return message.channel.send({ embeds: [embed] });
        } catch (err) {

            console.log(err)
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setTitle(`There was an error removing the role`)
                .setDescription(`Sorry we cannot do that, please try later!`)
            return message.channel.send({ embeds: [embed] });
        }

    }
})

