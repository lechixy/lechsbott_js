const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')
const { lechsPlayer } = require('./utils/lechsPlayer')
const { removeAndClear } = require('./utils/reasonFunctions')
const { Command } = require('../../lechs_modules/Command/index')

module.exports = new Command({
    name: 'disconnect',
    aliases: ['dc', 'leave'],
    description: 'Disconnects from voice channel!',
    category: ['Music'],
    arguments: `<none>`,
    async execute({client, message, args, cmd, Discord}) {

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
            try {
                const log = new lechsPlayer(message.guild.id)

                if (!log) {
                    const embed = new Discord.MessageEmbed()
                        .setColor(roleColor(message))
                        .setDescription(`**lechsbott** is not in a voice channel, there are no connections`)
                    return message.channel.send({ embeds: [embed] });
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setColor(roleColor(message))
                        .setDescription(`**Succesfully disconnected from** \`${message.member.voice.channel.name}\``)
                    message.channel.send({ embeds: [embed] });
                    log.connection.disconnect()
                    log.connection.destroy(false)
                    return
                }

            } catch (err) {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`**There was an error on disconnecting, please try later!**`)
                return message.channel.send({ embeds: [embed] });
            }
        } else {
            if (voice_channel.id !== server_queue.voice_channel.id) {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setTitle(`You need to be in same voice channel with lechsbott`)
                    .setDescription(`Sorry but you can't use ${cmd}, please make sure you're on the same channel as lechsbott`)
                return message.channel.send({ embeds: [embed] });
            }

            removeAndClear(queue, message, true)
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**Succesfully disconnected from** \`${message.member.voice.channel.name}\``)
            return message.channel.send({ embeds: [embed] });
        }
    }
})