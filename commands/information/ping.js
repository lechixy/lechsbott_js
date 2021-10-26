const Voice = require('@discordjs/voice')

module.exports = {
    name: 'ping',
    aliases: ["latency"],
    cooldown: 2,
    category: ['Information'],
    description: 'Get latency/respond speed',
    arguments: `<none>`,
    async execute(client, message, args, cmd, Discord) {

        const log = Voice.getVoiceConnection(message.guild.id)

        if(!log){
            let pingEmbed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}))
            .addField(`Latency/Respond`, `\`${Date.now() - message.createdTimestamp}ms\``)
            .addField(`Discord API`, `\`${Math.round(client.ws.ping)}ms\``)
            message.channel.send({ embeds: [pingEmbed] });
        } else {
            let ms = log.ping.ws
            if(!ms){
                ms = `Connecting`
            } else {
                ms = log.ping.ws+'ms'
            }

            let pingEmbed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}))
            .addField(`Latency/Respond`, `\`${Date.now() - message.createdTimestamp}ms\``)
            .addField(`Discord API`, `\`${Math.round(client.ws.ping)}ms\``)
            .addField(`Voice Connection`, `\`${ms} | ${log.ping.udp}udp\``)
            message.channel.send({ embeds: [pingEmbed] });
        }



    },
};