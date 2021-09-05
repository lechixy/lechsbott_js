const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name: 'totalmembers',
    aliases: ['totalusers'],
    cooldown: 10,
    description:'',
    async execute(client, message, args, cmd, Discord) {

        let total = 0

        let loading = new Discord.MessageEmbed()
        .setDescription(`<a:loading:846030612254687253> **Fetching all guilds member count, please wait...**`)
        const m = await message.channel.send({ embeds: [loading] });
        
        await client.guilds.cache.each(guild => total += guild.memberCount)

        const embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .addField(`Total Members`, `${total}`)
        m.edit({ embeds: [embed] });
        
  }
}