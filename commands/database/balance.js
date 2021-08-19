const { PREFIX } = require('../util/lechsbottUtil')
const profileModel = require('../../models/profileSchema')

module.exports = {
    name:'balance',
    aliases:['bal'],
    cooldown: 5,
    description:'',
    async execute(client, message, args, cmd, Discord) {


        let member = message.mentions.users.first() || message.author
        
        let profileData = await profileModel.findOne({ userID: member.id })

        if(!profileData){
          const embed = new Discord.MessageEmbed()
          .setDescription(`**User is not used lechsbott yet, so ${member} does not have any wallet**`)
          return message.channel.send({ embeds: [embed] });
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor(member.username, member.displayAvatarURL({dynamic: true}))
        .addField(`💵 Wallet`, `${profileData.coins.toLocaleString()}`, true)
        .addField(`🏦 Bank`, `${profileData.bank.toLocaleString()}`, true)
        message.channel.send({ embeds: [embed] });
        
  }
}