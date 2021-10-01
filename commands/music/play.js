//Importing needs
const { PREFIX } = require('../util/lechsbottUtil');
const Voice = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID } = require("../util/lechsbottUtil");
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(YOUTUBE_API_KEY)
const { getPreview, getTracks } = require('spotify-url-info')
const scdl = require('soundcloud-downloader').default;
const { SoundCloud } = require("scdl-core");
const scdlcore = new SoundCloud();
const moment = require("moment")
const progressbar = require('string-progressbar');
const { roleColor } = require('../util/lechsbottFunctions')
const { songFinder } = require('./utils')

module.exports = {
    name: 'play',
    cooldown: 5,
    aliases: ['p', 'skip', 'disconnect', 'dc', 'nowplaying', 'np'],
    description: '',
    async execute(client, message, args, cmd, Discord) {
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


        else if (cmd === 'skip') skip(message, args, client, queue, server_queue, voiceChannel, Discord);
        else if (cmd === 'disconnect' || cmd === 'dc') disconnect(message, args, client, queue, server_queue, voiceChannel, Discord);
        else if (cmd === 'nowplaying' || cmd === 'np') np_song(message, args, client, queue, server_queue, voiceChannel, Discord)
    },
};

const skip = (message, args, client, queue, server_queue, voiceChannel, Discord) => {
    if (!voiceChannel) {
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
    }

    if (!server_queue.songs[1]) {
        const embed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setDescription(`**There is no song to skip after this song in the queue**`)
        return message.channel.send({ embeds: [embed] });
    }
    const embed = new Discord.MessageEmbed()
        .setColor(roleColor(message))
        .setDescription(`**Skipped to** \`${server_queue.songs[1].title}\``)
    message.channel.send({ embeds: [embed] });
    server_queue.player.stop(true);
}

const disconnect = (message, args, client, queue, server_queue, voiceChannel, Discord) => {
    const Voice = require('@discordjs/voice')

    if (!voiceChannel) {
        const embed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setDescription(`**You need to be in a voice channel to execute this command**`)
        return message.channel.send({ embeds: [embed] });
    }
    if (!server_queue) {
        try {
            const log = Voice.getVoiceConnection(message.guild.id)

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
                log.disconnect()
                log.destroy(false)
                return
            }

        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**There was an error on disconnecting, please try later!**`)
            return message.channel.send({ embeds: [embed] });
        }

        return
    }
    server_queue.connection.destroy();
    queue.delete(message.guild.id)
    const embed = new Discord.MessageEmbed()
        .setColor(roleColor(message))
        .setDescription(`**Succesfully disconnected from** \`${message.member.voice.channel.name}\``)
    return message.channel.send({ embeds: [embed] });
}

const np_song = (message, args, client, queue, server_queue, voiceChannel, Discord) => {
    if (!server_queue) {
        const embed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setAuthor(`There is nothing playing on this server`, message.author.displayAvatarURL({ dynamic: true }))
        return message.channel.send({ embeds: [embed] });
    }

    const songduration = server_queue.resource.playbackDuration
    const totaltime = server_queue.songs[0].duration.toString()

    let elapsedtime

    if (totaltime.length >= 7) {
        elapsedtime = `${formatTime(moment.duration(songduration).hours())}:${formatTime(moment.duration(songduration).minutes())}:${formatTime(moment.duration(songduration).seconds())}`
    } else {
        elapsedtime = `${moment.duration(songduration).minutes()}:${formatTime(moment.duration(songduration).seconds())}`
    }


    function timeConverter(timestamp) {
        const split = timestamp.split(':')

        if (split.length > 2) {

            let [hour, minute, second] = split;

            return hour * 3600 + minute * 60 + second * 1
        } else {

            let [minute, second] = split;

            return (minute * 60 + second * 1)

        }
    }

    const bar = progressbar.splitBar(timeConverter(totaltime), timeConverter(elapsedtime), 25, '▬', ':blue_circle:').toString()


    function splitbar(bar) {
        const split = bar.split(',');

        let [part] = split;

        return part
    }

    let nowplayingembed = new Discord.MessageEmbed()
        .setColor(roleColor(message))
        .setTitle(`${server_queue.songs[0].title}`)
        .setURL(server_queue.songs[0].customurl)
        .setDescription(`<@${server_queue.songs[0].addedid}> added from **${server_queue.songs[0].app}**\n
    ${elapsedtime}<:transparent:890623794421592104>${splitbar(bar)}<:transparent:890623794421592104>${totaltime}`)
    message.channel.send({ embeds: [nowplayingembed] })
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}