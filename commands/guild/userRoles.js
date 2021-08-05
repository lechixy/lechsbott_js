const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'user-roles',
    aliases:['rolesuser'],
    description:'',
    async execute(client, message, args, cmd, Discord) {
      
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!member){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Please specify a member to see roles!`, message.author.displayAvatarURL({dynamic: true}))
            .addField('Usage', `${PREFIX}user-roles/rolesuser <tag member/user id>`)
            return message.channel.send({ embeds: [embed] });
        }

        const memberRoles = member.roles.cache
            .filter((roles) => roles.id !== message.guild.id)
            .map((role) => role.toString());
        
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.username}'s Roles`, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${memberRoles}`)
        message.channel.send({ embeds: [embed] });
      
      
  }
}