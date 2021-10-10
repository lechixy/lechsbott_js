const { PREFIX } = require('../util/lechsbottUtil')
const Voice = require('@discordjs/voice')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: 'pause',
    description: 'Pauses the audio player',
    category: ['Music'],
    async execute(client, message, args, cmd, Discord) {

        const queue = client.queue
        const server_queue = client.get(message.guild.id)

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
                    .setDescription(`Sorry but you can't use pause, please make sure you're on the same channel as lechsbott`)
                return message.channel.send({ embeds: [embed] });
            }
        }
    }
}