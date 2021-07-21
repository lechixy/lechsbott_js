module.exports = {
    name: 'nsfwmode',
    aliases: ['setnsfw', 'nsfwis', 'nsfw'],
    description: 'Sets nsfw for a Channel',
    async execute(client, message, args, cmd, Discord) {
    const useravatar = message.author.displayAvatarURL({dynamic: true})

    if (!message.member.hasPermission("BAN_MEMBERS")){
        let permsembed = new Discord.MessageEmbed()
        .setAuthor(`There are missing permissions for lechsbott`, useravatar)
        .addField(`<a:checked:849368486240452701> Needed Permissions`, `Ban Members`)
        .setTimestamp()
        return message.channel.send(permsembed)
    }
        
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel
    
    if(args[0] === 'true' || args[0] === 'on'){
        channel.setNSFW(true)
        let settedembed = new Discord.MessageEmbed()
        .setAuthor(`NSFW mode is setted to ${args[0]} for ${channel.name}`, useravatar)
        .setDescription(`Setted by <@${message.author.id}>`)
        .setColor('#850000')
        return message.channel.send(settedembed)
    }
    else if(args[0] === 'false' || args[0] === 'off'){
        channel.setNSFW(false)
        let settedembed = new Discord.MessageEmbed()
        .setAuthor(`NSFW mode is setted to ${args[0]} for ${channel.name}`, useravatar)
        .setDescription(`Setted by <@${message.author.id}>`)
        .setColor('#850000')
        return message.channel.send(settedembed)
    }
    else if(!args[0]){
        let argsembed = new Discord.MessageEmbed()
        .setAuthor(`You need to type boolean for nsfw to be set to l!setnsfw <true or false>`, useravatar)
        return message.channel.send(argsembed)
    }
}
}
