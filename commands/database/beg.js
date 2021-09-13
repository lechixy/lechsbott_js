const { PREFIX } = require('../util/lechsbottUtil')
const profileModel = require('../../models/profileSchema')

module.exports = {
  name: 'beg',
  cooldown: 5,
  description: '',
  async execute(client, message, args, cmd, Discord) {
    let profileData = await profileModel.findOne({ userID: message.author.id })

    const randomed = Math.floor(Math.random() * 300)
    const response = await profileModel.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: randomed } })

    const embed = new Discord.MessageEmbed()
      .setDescription(`You begged and earned **${randomed}** money!`)
    message.channel.send({ embeds: [embed] });
  }
}