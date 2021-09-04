const { PREFIX } = require('../util/lechsbottUtil')
const cooldowns = new Map();
const profileModel = require('../../models/profileSchema')
const moment = require('moment')

module.exports = {
    name:'work',
    aliases: ['gowork', 'gotowork'],
    cooldown: 5,
    description:'',
    async execute(client, message, args, cmd, Discord) {

        if(!cooldowns.has(cmd)){
            cooldowns.set(cmd, new Discord.Collection());
        }


        const current_time = Date.now();
        const time_stamps = cooldowns.get(cmd);
        const cooldown_amount = 7200 * 1000
        

        if(time_stamps.has(message.author.id)){
            const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
    
            if(current_time < expiration_time){
                const time_left = (expiration_time - current_time)

                let embed = new Discord.MessageEmbed()
                .setDescription(`😪 **You are tired, wait ${moment.duration(time_left).hours()} hours ${moment.duration(time_left).minutes()} minutes for go to work!**`)
                return message.channel.send({ embeds: [embed] })
            }        
        }

        //If the author's id is not in time_stamps then add them with the current time.
        time_stamps.set(message.author.id, current_time);
        // Delete the user's id once the cooldown is over.
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);    
        
        const jobs = [
            "Mechanic",
            "Bus Driver",
            "Builder",
            "Waiter",
            "Programmer",
            "Worker",
            "Garbageman",
            "Baker",
            "Bricklayer",
            "Cleaner",
            "Gardener",
            "Lifeguard",
            "Plumber",
            "Tailor",
            "Window cleaner",
            "Traffic warden",
            "Postman",
            "Photographer",
            "Painter",
            "Factory worker",
            "Fisherman"
        ];

        const amount = Math.floor(Math.random() *2000)+1
        const jobIndex = Math.floor(Math.random() * jobs.length)

        await profileModel.findOneAndUpdate({ userID: message.author.id }, { $inc: { coins: amount } })

        const embed = new Discord.MessageEmbed()
        .setDescription(`You worked as **${jobs[jobIndex]}** and earned **${amount} coins!**`)
        message.channel.send({ embeds: [embed] });

        
        
  }
}