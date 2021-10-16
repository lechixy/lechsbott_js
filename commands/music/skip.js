const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: 'skip',
    description: 'Skips to next track',
    cooldown: 3,
    category: ['Music'],
    async execute(client, message, args, cmd, Discord) {

        const queue = client.queue
        const server_queue = queue.get(message.guild.id)

        const voice_channel = message.member.voice.channel

        if (!voice_channel) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**You need to be in a voice channel to execute this command**`)
            return message.channel.send({ embeds: [embed] });
        }
        if (!server_queue) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**There is nothing playing on this server**`)
            return message.channel.send({ embeds: [embed] });
        } else {
            if (voice_channel.id !== server_queue.voice_channel.id) {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setTitle(`You need to be in same voice channel with lechsbott`)
                    .setDescription(`Sorry but you can't use skip, please make sure you're on the same channel as lechsbott`)
                return message.channel.send({ embeds: [embed] });
            }
        }

        if (!server_queue.songs[1]) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**There is no song to skip after this song in the queue**`)
            return message.channel.send({ embeds: [embed] });
        }

        try {
            server_queue.player.stop(true);

            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**Skipped to** \`${server_queue.songs[0].title}\``)
            return message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.log(err)
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**There was an error on skipping try later!**`)
            return message.channel.send({ embeds: [embed] });
        }
    }
}