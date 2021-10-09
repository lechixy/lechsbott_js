const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'topguilds',
    aliases:['clientguilds'],
    description:'',
    category: ['lechsbott'],
    async execute(client, message, args, cmd, Discord) {
      
        const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10);
        
        const description = guilds
            .map((guild, index) => {
            return `**${index+1} |** ${guild.name} with **${guild.memberCount}** members`;
            })
            .join("\n")
        
        const embed = new Discord.MessageEmbed()
        .setTitle('Top Guilds')
        .setDescription(description)
        message.channel.send({ embeds: [embed] });
    
  }
}