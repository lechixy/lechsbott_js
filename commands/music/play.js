//Importing needs
const { PREFIX } = require('../util/lechsbottUtil');
const Voice = require('@discordjs/voice');
const { roleColor } = require('../util/lechsbottFunctions')
const { songFinder } = require('./utils/songFinder')
const { Command } = require('../../lechs_modules/Command/index')

module.exports = new Command({
    name: 'play',
    cooldown: 5,
    aliases: ['p'],
    description:'Play songs in voice channel!',
    category: ['Music'],
    arguments: `<youtube search/link/playlist\nspotify link/playlist\n soundcloud link/playlist>`,
    async execute({client, message, args, cmd, Discord}) {
        const voiceChannel = message.member.voice;
        const queue = client.queue
        const server_queue = queue.get(message.guild.id)

        if (cmd === 'play' || cmd === 'p') {

            if (!voiceChannel.channel) {
                let voiceembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setAuthor(
                        `You need to be in a voice channel for play a music!`,
                        message.author.displayAvatarURL({ dynamic: true })
                    )
                return message.channel.send({ embeds: [voiceembed] });
            }

            if (server_queue) {

                //resfresh text channel
                server_queue.text_channel = message.channel

                if (voiceChannel.channel.id !== server_queue.voice_channel.id) {
                    const embed = new Discord.MessageEmbed()
                        .setColor(roleColor(message))
                        .setAuthor(`There is currently playing a song on another voice channel`, message.author.displayAvatarURL({ dynamic: true }))
                    return message.channel.send({ embeds: [embed] });
                }
            }

            if (!args[0]) {
                let argsembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setAuthor(
                        `l!${cmd} [query]`,
                        message.author.displayAvatarURL({ dynamic: true })
                    )
                    .addField(`youtube`, `search/link/playlist`, true)
                    .addField(`spotify`, `link/playlist`, true)
                    .addField('soundcloud', 'link/playlist', true);
                return message.channel.send({ embeds: [argsembed] });
            }

            let player = Voice.joinVoiceChannel({
                channelId: voiceChannel.channel.id,
                guildId: voiceChannel.channel.guild.id,
                adapterCreator: voiceChannel.channel.guild.voiceAdapterCreator,
                selfDeaf: true,
            });

            try {
                await Voice.entersState(
                    player,
                    Voice.VoiceConnectionStatus.Ready,
                    20000
                );
            } catch(e) {
                console.log(e)
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message)).setDescription(
                        `**Failed to join voice channel within 20 seconds, please try again later!**`
                    );
                message.channel.send({ embeds: [embed] });
                return;
            }

            songFinder(message, args, client, player, voiceChannel);
        }
    },
})