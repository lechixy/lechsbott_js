module.exports = {
    name: 'ping',
    aliases: ["latency", "gecikme"],
    cooldown: 0,

    execute(client, message, args, cmd, Discord) {
        let pingEmbed = new Discord.MessageEmbed()
        .setColor('0xff0000')
        .setAuthor(name=`🏓 Latency is ${Date.now() - message.createdTimestamp}ms / API Latency is ${Math.round(client.ws.ping)}ms`) 
        message.channel.send(pingEmbed);
    },
};