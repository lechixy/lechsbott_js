module.exports = {
    name: "uptime",
    cooldown: '0',
    aliases: ['online'],
    description: "Online from",
    async execute(client, message, args, cmd, Discord) {
        const { OWNER1, OWNER2 } = require("../util/lechsbottUtil");

        const cross = client.emojis.cache.get("846030611486474280");
    
        let seconds = Math.floor(message.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        let weeks = Math.floor(days / 7);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        days %= 7;
        weeks %= 7;

        if(!message.author.id === OWNER1 || message.author.id === OWNER2) {
            let unauthorized = new Discord.MessageEmbed()
            .setDescription(`This is an owner command, unauthorized for this command!`)
            message.channel.send(unauthorized)
        }
        
        let infoembed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle('lechsbott uptime')
        .setDescription(`Elapsed ${seconds} seconds, ${minutes} minutes, ${hours} hours, ${days} days, ${weeks} weeks`) 
        .setTimestamp()
        message.channel.send(infoembed)
    }
}
