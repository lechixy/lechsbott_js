const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name:'lockchannel',
    aliases:['lockdown', 'lock'],
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        if (!message.member.permissions.has("MANAGE_CHANNELS") && !message.member.permissions.has("MANAGE_ROLES")) {
            let permsembed = new Discord.MessageEmbed()
                .setDescription(`**You are not able to use this command!**`)
                .addField(
                    "Needed Permissions",
                    "Manage Channels"
                );
                return message.channel.send({ embeds: [permsembed] }).then(m => {
                    setTimeout(function() { m.delete() }, 10000)
                })
        }

        if (!message.guild.me.permissions.has("MANAGE_CHANNELS") && !message.guild.me.permissions.has("MANAGE_ROLES")) {
            let permsembed = new Discord.MessageEmbed()
                .setDescription(`**There are missing permissions for lechsbott**`)
                .addField(
                    "Needed Permissions",
                    "Manage Channels"
                );
                return message.channel.send({ embeds: [permsembed] }).then(m => {
                    setTimeout(function() { m.delete() }, 10000)
                })
        }
        
        
        if(!args[0] || !['true', 'on', 'false', 'off'].includes(args[0])) {
            const embed = new Discord.MessageEmbed()
            .setDescription(
                `**Either you did not type any statement or option you have stated is not valid!**`
            )
            .addField('Usage', `${PREFIX}${cmd} <true/on | false/off>`)
            message.channel.send({ embeds: [embed] });
        }

        let channel = message.mentions.channels.first() || message.channel
        let check = channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")

        if(['true', 'on'].includes(args[0])) {
            
            if(!check) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**This** <#${channel.id}> **channel is already locked**\nMembers can't send any messages to channel until lock turned off`)
                return message.channel.send({ embeds: [embed] });
            }

            channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: false })

            const embed = new Discord.MessageEmbed()
            .setDescription(`**This** <#${channel.id}> **channel is locked**\nMembers can't send any messages to channel until lock turned off`)
            return message.channel.send({ embeds: [embed] });
        }

        if(['false', 'off'].includes(args[0])) {
            
            if(check) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**This** <#${channel.id}> **channel is not locked**\nMembers can send any messages to channel`)
                return message.channel.send({ embeds: [embed] });
            }

            channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true })

            const embed = new Discord.MessageEmbed()
            .setDescription(`**This** <#${channel.id}> **channel now unlocked**\nMembers can send any messages to channel`)
            return message.channel.send({ embeds: [embed] });
        }
  }
}