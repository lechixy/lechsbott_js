const { PREFIX } = require('../util/lechsbottUtil')
const profileModel = require('../../models/profileSchema')

module.exports = {
    name:'withdraw',
    aliases:['draw'],
    cooldown: 5,
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`**How much coins you want withdraw it?**`)
        .addField(`Usage`, `${PREFIX}${cmd} <amount>`, true)

        if(!args[0]) return message.channel.send({ embeds: [embed] })

        const amount = args[0]

        if(amount % 1 != 0 || amount <= 0) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`**Withdraw amount must be a whole number**`)
            .addField(`Usage`, `${PREFIX}${cmd} <amount>`, true)
            return message.channel.send({ embeds: [embed] })
        }

        let profileData = await profileModel.findOne({ userID: message.author.id })

        try {

            if(amount > profileData.bank) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**You don't have that amount of money in your bank to withdraw**`)
                .addField(`Usage`, `${PREFIX}${cmd} <amount>`, true)
                return message.channel.send({ embeds: [embed] })
            }
        
            await profileModel.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: amount, bank: -amount, } })
        
            const embed = new Discord.MessageEmbed()
            .setDescription(`**You drawed ${amount.toLocaleString()} of coins into your wallet**`)
            return message.channel.send({ embeds: [embed] })

        } catch(err) {
            console.log(err)
        }
        
  }
}