module.exports = {
    name: 'ping',
    aliases: ["latency", "gecikme"],
    cooldown: 0,

    execute(client, message, args, cmd, Discord) {
        let pingEmbed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .addField(`<a:loading:846030612254687253> Latency`, `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\``, true)
        .addField(`<a:signal:846018763526766612> API Latency`, `\`\`\`yaml\n${Math.round(client.ws.ping)}ms\`\`\``, true)
        message.channel.send({ embeds: [pingEmbed] });
    },
};