module.exports = {
    name: 'clientstatistics',
    description: '',
    async execute(client, message, args, cmd, Discord){
        let clientembed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({dynamic: true}))
        .addField(`Total Online`, client.users.cache.size, true)
        .addField(`Total Channels`, client.channels.cache.size, true)
        .addField(`Total Guilds`, client.guilds.cache.size, true)
        message.channel.send(clientembed)
    }
}