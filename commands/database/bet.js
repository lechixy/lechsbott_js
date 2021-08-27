const { PREFIX } = require('../util/lechsbottUtil')
const profileModel = require('../../models/profileSchema')

module.exports = {
    name:'bet',
    cooldown: 5,
    description:'',
    async execute(client, message, args, cmd, Discord) {
        let profileData = await profileModel.findOne({ userID: message.author.id })
        
        if(!args[0]){
            let argsembed = new Discord.MessageEmbed()
            .setDescription(`**How much money you bet it?**\nYou either lose or double the money, depending on your luck`)
            .addField(`Usage`, `l!bet <amount>`, true)
            return message.channel.send({ embeds: [argsembed] })
        }
        if(isNaN(args[0])){
            let numberembed = new Discord.MessageEmbed()
            .setDescription(`**Amount of bet must be a number**`)
            .addField(`Usage`, `l!bet <amount>`, true)
            return message.channel.send({ embeds: [numberembed] })
        }
        if(args[0] < 500){
            let maxembed = new Discord.MessageEmbed()
            .setDescription(`You can bet at least 500 money!`)
            return message.channel.send({ embeds: [maxembed] })
        }
        if(args[0] > 50000){
            let maxembed = new Discord.MessageEmbed()
            .setDescription(`You can bet most 50000 money!`)
            return message.channel.send({ embeds: [maxembed] })
        }
        if(args[0] > profileData.coins){
            let moneyembed = new Discord.MessageEmbed()
            .setDescription(`**There is not enough money for play bet!**\nYou have ${profileData.coins} on your wallet`)
            return message.channel.send({ embeds: [moneyembed] })
        }
        
        const chance = 60
        const amount = args[0]

        const randomed = Math.floor(Math.random() * 101)

        if(randomed >= chance){
            const updated = profileData.coins+args[0]*2
            const response = await profileModel.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: args[0]*2 } })

            let embed = new Discord.MessageEmbed()
            .setAuthor(`You won the bet, wallet balance doubled it`)
            .setColor('#15FF00')
            .addField(`Now have`, `${updated.toLocaleString()}`, true)
            .addField(`Earned`, `${(args[0]).toLocaleString()}`, true)
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [embed] })

        } else if(randomed <= chance){
            const updated = profileData.coins-args[0]
            const response = await profileModel.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: -args[0] } })


            let embed = new Discord.MessageEmbed()
            .setAuthor(`You losted the bet, wallet balance reduced`)
            .setColor('#FF0000')
            .addField(`Now have`, `${updated.toLocaleString()}`, true)
            .addField(`Reduced`, `${(args[0]).toLocaleString()}`, true)
            .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [embed] })
        }
        
  }
}