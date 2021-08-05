module.exports = {
    name:'fetchbans',
    aliases:['serverbans'],
    description:'',
    async execute(client, message, args, cmd, Discord) {
      
        if(!message.member.permissions.has('BAN_MEMBERS')){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`You don't able to use this command!`, message.author.displayAvatarURL({dynamic: true}))
            .addField('Need Perms', 'Ban Members')
            return message.channel.send({ embeds: [embed] });
        }

        const fetchBans = await message.guild.fetchBans()

        try {
            const bannedMembers = (await fetchBans)
            .map((member) => member.user.tag)
            .join('\n')

            message.channel.send(bannedMembers)
        } catch (err) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`There are no banned members for ${message.guild.name}`, message.author.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [embed] });
        }


      
      
  }
}