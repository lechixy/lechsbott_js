module.exports = {
    name: 'slowmode',
    aliases: ['setslow', 'slowis', 'cooldown'],
    description: 'Sets SlowMode for a Channel',
    async execute(client, message, args, cmd, Discord) {
    const useravatar = message.author.displayAvatarURL({dynamic: true})
    if(cmd === 'setslow' || cmd === 'slowis' || cmd === 'slowmode'){
        if (!message.member.hasPermission("MANAGE_MESSAGES")){
            let permsembed = new Discord.MessageEmbed()
            .setAuthor(`There are missing permissions for lechsbott`, useravatar)
            .addField(`<a:checked:849368486240452701> Needed Permissions`, `Manage Messages`)
            .setTimestamp()
            return message.channel.send(permsembed)
        }
        
        if (!args[0]){
            let argsembed = new Discord.MessageEmbed()
            .setAuthor(`You need to type second for slowmode to be set to l!setslow <number>`, useravatar)
            return message.channel.send(argsembed)
        } 
        if(isNaN(args[0])){
            let numberembed = new Discord.MessageEmbed()
            .setAuthor(`Please type a real number!`, useravatar)
            return message.channel.send(numberembed)
        } 
        if (args[0] > 21600){
            let number1embed = new Discord.MessageEmbed()
            .setAuthor(`Number must be between 0 - 21600`, useravatar)
            return message.channel.send(number1embed)
        }
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel
        
        channel.setRateLimitPerUser(args[0])
        let settedembed = new Discord.MessageEmbed()
        .setAuthor(`Slow mode is setted to ${args[0]} for ${channel.name}`, useravatar)
        .setDescription(`Setted by <@${message.author.id}>`)
        return message.channel.send(settedembed)
        
        .catch((e) => {
            let anerrorembed = new Discord.MessageEmbed()
            .setAuthor(`An error occurred while process`, useravatar)
            message.channel.send(anerrorembed)
            e ? console.error(e) : console.log('Uknown Error')
        })
    }
}
}
