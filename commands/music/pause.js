const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')
const { lechsPlayer } = require('../music/utils/lechsPlayer')
const { Command } = require('../../lechs_modules/Command/index')

module.exports = new Command({
    name: 'pause',
    description: 'Pauses the audio player!',
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

        const lechplayer = new lechsPlayer(message.guild.id)

        try {
            if(lechplayer.player().state.status === 'playing'){
                lechplayer.player().pause()
    
                const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**⏸️ Paused**`)
                return message.channel.send({ embeds: [embed] });
            } else if(lechplayer.player().state.status === 'paused') {
                const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**⏸️ Already paused**`)
                return message.channel.send({ embeds: [embed] });
            }
        } catch (err) {
            console.log(err)

            const embed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setDescription(`There is an error trying to pause player, try later!`)
            return message.channel.send({ embeds: [embed] });
        }


    }
})