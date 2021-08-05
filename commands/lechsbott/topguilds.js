const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'topguilds',
    aliases:['clientguilds'],
    description:'',
    async execute(client, message, args, cmd, Discord) {
      
        const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10);
        
        const description = guilds
            .map((guild, index) => {
            return `**${index+1} |** ${guild.name} **•** ${guild.memberCount} members`;
            })
            .join("\n")
        
        const embed = new Discord.MessageEmbed()
        .setTitle('Top Guilds')
        .setDescription(description)
        .addField('\u200b', '\u200b')
        .addField('<:online:864256296152596480> Total Members', client.users.cache.size, true)
        .addField('<:tag:863842838869442591> Total Channels', client.channels.cache.size, true)
        .addField(':beginner: Total Guilds', client.guilds.cache.size, true)
        message.channel.send({ embeds: [embed] });
    
  }
}