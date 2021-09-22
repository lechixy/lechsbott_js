module.exports = {
    name: "uptime",
    cooldown: '0',
    aliases: ['online'],
    description: "Online from",
    ownerOnly: true,
    async execute(client, message, args, cmd, Discord) {
    
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
        
        let infoembed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle('lechsbott uptime')
        .setDescription(`Elapsed ${seconds} seconds, ${minutes} minutes, ${hours} hours, ${days} days, ${weeks} weeks`) 
        .setTimestamp()
        message.channel.send({ embeds: [infoembed] })
    }
}
