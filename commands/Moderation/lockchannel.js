const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name:'lock',
    aliases:['lockdown', 'lockchannel'],
    description:'Locks channel and no one send any messages',
    category: ['Moderation'],
    arguments: `<true/on | false/off>`,
    userPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
    clientPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
    async execute(client, message, args, cmd, Discord) {
        
        
        if(!args[0] || !['true', 'on', 'false', 'off'].includes(args[0])) {
            const embed = new Discord.MessageEmbed()
            .setDescription(
                `**❌ Either you did not type any statement or option you have stated is not valid!**`
            )
            .addField('Usage', `${PREFIX}${cmd} <true/on | false/off>`)
            message.channel.send({ embeds: [embed] });
        }

        let channel = message.mentions.channels.first() || message.channel
        let check = channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")

        if(['true', 'on'].includes(args[0])) {
            
            if(!check) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`<#${channel.id}> **channel is already locked ❌**\nMembers can't send any messages to channel until lock turned off`)
                return message.channel.send({ embeds: [embed] });
            }

            channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: false })

            const embed = new Discord.MessageEmbed()
            .setDescription(`<#${channel.id}> **channel is locked 🔒**\nMembers can't send any messages to channel until lock turned off`)
            return message.channel.send({ embeds: [embed] });
        }

        if(['false', 'off'].includes(args[0])) {
            
            if(check) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`<#${channel.id}> **channel is not locked ❌**\nMembers can send any messages to channel`)
                return message.channel.send({ embeds: [embed] });
            }

            channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true })

            const embed = new Discord.MessageEmbed()
            .setDescription(`<#${channel.id}> **channel now unlocked 🔓**\nMembers can send any messages to channel`)
            return message.channel.send({ embeds: [embed] });
        }
  }
}