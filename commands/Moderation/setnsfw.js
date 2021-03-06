const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name: 'nsfwmode',
    aliases: ['setnsfw', 'nsfwis', 'nsfw'],
    description: 'Set nsfw mode for a text channel',
    category: ['Moderation'],
    arguments: `<true/on | false/off>`,
    userPerms: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
    clientPerms: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
    async execute(client, message, args, cmd, Discord) {
        
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel
    
    if (!args[0] || !isNaN(args[0])) {
        let argsembed = new Discord.MessageEmbed()
            .setDescription(`**You need to type boolean value for NSFW**`)
            .addField("Usage", `${PREFIX}${cmd} <true/on | false/off>`);
            return message.channel.send({ embeds: [argsembed] }).then(m => {
                setTimeout(function() { m.delete() }, 10000)
            })
    }

    if(!['true', 'false', 'on', 'off'].includes(args[0])){
        const embed = new Discord.MessageEmbed()
        .setDescription("**The option you have stated is not valid!**")
        .addField("Usage", `${PREFIX}${cmd} <true/on | false/off>`);
        return message.channel.send({ embeds: [embed] }).then(m => {
            setTimeout(function() { m.delete() }, 10000)
        })
    }

    if(args[0] === 'true' || args[0] === 'on'){
        channel.setNSFW(true)
        let settedembed = new Discord.MessageEmbed()
        .setDescription(`**NSFW mode is enabled for** <#${channel.id}>\nThis channel may not safe for work for some members!`)
        return message.channel.send({ embeds: [settedembed] }).then(m => {
            setTimeout(function() { m.delete() }, 10000)
        })
    }
    else if(args[0] === 'false' || args[0] === 'off'){
        channel.setNSFW(false)
        let settedembed = new Discord.MessageEmbed()
        .setDescription(`**NSFW mode is now disabled for** <#${channel.id}>`)
        return message.channel.send({ embeds: [settedembed] }).then(m => {
            setTimeout(function() { m.delete() }, 10000)
        })
    }
}
}
