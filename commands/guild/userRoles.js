const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'roles',
    aliases:['userroles', 'user-roles',],
    description:'',
    async execute(client, message, args, cmd, Discord) {
      
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!member){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Please specify a member to see roles!`, message.author.displayAvatarURL({dynamic: true}))
            .addField('Usage', `${PREFIX}${cmd} <tag member/user id>`)
            return message.channel.send({ embeds: [embed] });
        }

        let memroles = []

        const memberRoles = member.roles.cache
            .filter((roles) => roles.id !== message.guild.id)
            .map((role) => {
                memroles.push(role)
            });
        
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.username}'s Roles`, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${memroles.join(' ')}`)
        message.channel.send({ embeds: [embed] });
      
      
  }
}