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
            });

            try {
                await Voice.entersState(
                    player,
                    Voice.VoiceConnectionStatus.Ready,
                    20000
                );
            } catch {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message)).setDescription(
                        `**Failed to join voice channel within 20 seconds, please try again later!**`
                    );
                message.channel.send({ embeds: [embed] });
                return;
            }

            songFinder(message, args, client, player, voiceChannel);
        }


        else if (cmd === 'skip') skip(message, args, client, server_queue, voiceChannel, Discord);
        else if (cmd === 'disconnect' || cmd === 'dc') disconnect(message, args, client, server_queue, voiceChannel, Discord);
        else if (cmd === 'nowplaying' || cmd === 'np') np_song(message, args, client, server_queue, voiceChannel, Discord)
    },
};

async function songFinder(message, args, client, player, voiceChannel) {
    const Discord = require('discord.js');
    const ytemoji = client.emojis.cache.get("846030610526634005");
    const spotifyemoji = client.emojis.cache.get("846030610929418310");
    const scemoji = client.emojis.cache.get("865548940694519819");
    const playlisturl = 'https://www.youtube.com/playlist?list=';
    const spotifyurl = 'https://open.spotify.com/track/';
    const spotifyplaylisturl = "https://open.spotify.com/playlist/";
    const scurl = 'https://soundcloud.com/'

    let song = {};

    if (args[0].includes(scurl)) {
        message.channel.send(`${scemoji} **Searching on SoundCloud** :mag_right: \`${args.join(' ')}\``)

        scdlcore.connect(SOUNDCLOUD_CLIENT_ID).then(async () => {

            const scdlinfoget = await scdlcore.tracks.getTrack(args[0])

            if (scdlinfoget) {
                if (scdlinfoget.kind === 'track') {

                    const durationvideo = scdlinfoget.duration

                    song = {
                        url: scdlinfoget.permalink_url,
                        title: scdlinfoget.title,
                        type: 'sc',
                        app: 'SoundCloud',
                        customurl: scdlinfoget.permalink_url,
                        addedby: message.author.username,
                        addedid: message.author.id,
                        duration: `${moment.duration(durationvideo).minutes()}:${formatTime(moment.duration(durationvideo).seconds())}`
                    }
                    await handleResource(song, message, args, voiceChannel, player, 'sc', 'false', client)
                } else if (scdlinfoget.kind === 'playlist') {

                    const otherscdlhandler = await scdl.getSetInfo(args[0])

                    for (const track of otherscdlhandler.tracks) {
                        if (!track.title) {
                            continue;
                        }

                        const durationvideo = track.duration

                        song = {
                            url: track.permalink_url,
                            title: track.title,
                            type: 'sc',
                            app: 'SoundCloud',
                            customurl: track.permalink_url,
                            addedby: message.author.username,
                            addedid: message.author.id,
                            duration: `${moment.duration(durationvideo).minutes()}:${formatTime(moment.duration(durationvideo).seconds())}`
                        }
                        await handleResource(song, message, args, voiceChannel, player, 'sc', 'soundcloudplaylist', client)
                    }

                    let playlistembed = new Discord.MessageEmbed()
                        .setColor(roleColor(message))
                        .setAuthor(`SoundCloud playlist has been added to the queue with ${scdlinfoget.tracks.length} songs!`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    return message.channel.send({ embeds: [playlistembed] })
                }

            } else if (!scdlinfoget) {
                let errorembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`${scemoji} Song or playlist isn't found on SoundCloud!`)
                return message.channel.send({ embeds: [errorembed] })
            }
        })
    }
    else if (args[0].includes(spotifyurl)) {
        message.channel.send(`${spotifyemoji} **Searching on Spotify** :mag_right: \`${args.join(' ')}\``)

        const spotify_finder = await getPreview(args[0])

        const search_title = `${spotify_finder.artist} - ${spotify_finder.title}`


        const spoyt_finder = async (query) => {
            const video_result = await ytSearch(query);
            return (video_result.videos.length > 1) ? video_result.videos[0] : null;
        }

        const spoytvid = await spoyt_finder(search_title);

        if (spoytvid) {
            song = {
                url: spoytvid.url,
                title: `${spotify_finder.artist} - ${spotify_finder.title}`,
                type: 'normal',
                app: 'Spotify',
                customurl: args[0],
                addedby: message.author.username,
                addedid: message.author.id,
                duration: spoytvid.duration.timestamp,
            }
        } else {
            let errorembed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`${spotifyemoji} Song isn't found on Spotify!`)
            return message.channel.send({ embeds: [errorembed] })
        }
        await handleResource(song, message, args, voiceChannel, player, 'normal', 'false', client)
    }
    else if (args[0].includes(spotifyplaylisturl)) {
        message.channel.send(`${spotifyemoji} **Searching playlist** :mag_right: \`${args.join(' ')}\``)

        const data = await getTracks(args[0])

        const spoyt_finder = async (query) => {
            const video_result = await ytSearch(query);
            return (video_result.videos.length > 1) ? video_result.videos[0] : null;
        }

        let number = data.length

        for (const track of data) {
            const search_title = `${track.artists[0].name} ${track.name}`

            const spotifyplaylist = await spoyt_finder(search_title);

            if (spotifyplaylist) {
                song = {
                    url: spotifyplaylist.url,
                    title: search_title,
                    type: 'normal',
                    app: 'Spotify',
                    customurl: args[0],
                    addedby: message.author.username,
                    addedid: message.author.id,
                    duration: spotifyplaylist.duration.timestamp,
                }
                await handleResource(song, message, args, voiceChannel, player, 'normal', 'spotifyplaylist', client)
            } else {
                let errorembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`${spotifyemoji} Playlist isn't found on Spotify!`)
                message.channel.send({ embeds: [errorembed] })
            }
        }

        let playlistembed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setAuthor(`Spotify playlist has been added to the queue with ${number} songs!`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        return message.channel.send({ embeds: [playlistembed] })
    }
    else if (args[0].includes(playlisturl)) {
        message.channel.send(`${ytemoji} **Searching playlist** :mag_right: \`${args.join(' ')}\``)

        const playlist = await youtube.getPlaylist(args[0]);
        const videos = await playlist.getVideos();

        for (const video of Object.values(videos)) {
            const ytplaylist = await youtube.getVideoByID(video.id)

            let song = {
                title: ytplaylist.title,
                url: `https://www.youtube.com/watch?v=${ytplaylist.id}`,
                type: 'normal',
                app: 'YouTube',
                customurl: `${args[0]}`,
                addedby: message.author.username,
                addedid: message.author.id,
                duration: `${ytplaylist.duration.minutes}:${ytplaylist.durationSeconds}`,
            }

            await handleResource(song, message, args, voiceChannel, player, 'normal', 'youtubeplaylist', client)
        }
        let playlistembed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setAuthor(`Youtube playlist has been added to the queue with ${playlist.videos.length} songs!`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        return message.channel.send({ embeds: [playlistembed] })
    }

    else if (ytdl.validateURL(args[0])) {
        message.channel.send(
            `${ytemoji} **Searching for** \`${args.join(' ')}\``
        );

        const song_info = await ytdl.getBasicInfo(args[0]);
        const ytsinfo = await ytSearch({
            videoId: song_info.videoDetails.videoId,
        });

        song = {
            url: song_info.videoDetails.video_url,
            title: song_info.videoDetails.title,
            type: 'normal',
            app: 'YouTube',
            customurl: song_info.videoDetails.video_url,
            addedby: message.author.username,
            addedid: message.author.id,
            duration: ytsinfo.duration.timestamp,
        };
        await handleResource(song, message, args, voiceChannel, player, 'normal', 'false', client);
    } else {
        message.channel.send(
            `${ytemoji} **Searching for** \`${args.join(' ')}\``
        );
        //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
        const video_finder = async (query) => {
            const video_result = await ytSearch(query);
            return video_result.videos.length > 1 ? video_result.videos[0] : null;
        };

        const video = await video_finder(args.join(' '));
        if (video) {
            song = {
                title: video.title,
                url: video.url,
                type: 'normal',
                app: 'YouTube',
                customurl: video.url,
                addedby: message.author.username,
                addedid: message.author.id,
                duration: video.duration.timestamp,
            };
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message)).setDescription(
                    `**No videos found within** \`${args.join(' ')}\` on YouTube!`
                );
            return message.channel.send({ embeds: [embed] });
        }
        await handleResource(song, message, args, voiceChannel, player, 'normal', 'false', client)
    }
}

async function handleResource(video, message, args, voice_channel, player, type, playlist, client) {
    const Discord = require('discord.js');
    const queue = client.queue
    const server_queue = queue.get(message.guild.id)

    const song = {
        title: video.title,
        url: video.url,
        type: video.type,
        app: video.app,
        customurl: video.customurl,
        addedby: video.addedby,
        addedid: video.addedid,
        duration: video.duration,
    };

    if (!server_queue) {

        const queue_constructor = {
            voice_channel: message.member.voice.channel,
            text_channel: message.channel,
            player: null,
            connection: null,
            songs: [],
            volume: 1,
            playing: true,
            resource: null,
        }

        //Add our key and value pair into the global queue. We then use this to get our server queue.
        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);

        const lechsbottPlayer = async (guild, song) => {
            const queue = client.queue
            const song_queue = queue.get(message.guild.id)

            if (!song) {
                queue.delete(guild.id);
                song_queue.player.stop(true);
                console.log('deleted song queue because no song in songs[1]');
            }

            if (song.type === 'normal') {

                const stream = ytdl(song.url, { filter: 'audioonly', highWaterMark: 32, quality: 'highestaudio', });
                let resource = Voice.createAudioResource(stream);
                queue_constructor.resource = resource;

                player.subscribe(song_queue.player);
                song_queue.player.play(resource);
            } else if (song.type === 'sc') {
                const stream = await scdl.download(song.url)
                let resource = Voice.createAudioResource(stream);
                queue_constructor.resource = resource;


                player.subscribe(song_queue.player);
                song_queue.player.play(resource);
            }

            song_queue.player.on(Voice.AudioPlayerStatus.Idle, async () => {
                console.log(
                    `Audio player transitioned idle`
                );

                song_queue.songs.shift();
                lechsbottPlayer(message.guild, song_queue.songs[0]);
            });

            song_queue.connection.on('stateChange', async (oldState, newState) => {
                console.log(
                    `Connection transitioned from ${oldState.status} to ${newState.status}`
                );

                if (oldState.status === 'ready' && newState.status === 'disconnected') {
                    queue.delete(guild.id)
                    song_queue.player.stop(true);
                    console.log('deleted song queue');
                    return
                }
            })

            let playing = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setAuthor(
                    (name = `Now playing`),
                    (icon_url = `${message.author.displayAvatarURL({ dynamic: true })}`)
                )
                .setTitle(`${song.title}`)
                .setURL(`${song.customurl}`)
                .setFooter(`${song.addedby}`)
                .setTimestamp();

            song_queue.text_channel.send({ embeds: [playing] })

        };

        try {
            let player = Voice.createAudioPlayer({
                behaviors: { noSubscriber: Voice.NoSubscriberBehavior.Pause },
            });
            queue_constructor.player = player;

            const connection = Voice.getVoiceConnection(
                queue_constructor.voice_channel.guild.id,
                'default'
            );
            queue_constructor.connection = connection;

            lechsbottPlayer(message.guild, queue_constructor.songs[0]);
        } catch (err) {
            queue.delete(message.guild.id);
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**There was an error connecting!**`)
            message.channel.send(embed);
            throw new Error(err)
        }
    } else {
        server_queue.songs.push(song)

        if (playlist === 'youtubeplaylist') return undefined;
        else if (playlist === 'spotifyplaylist') return undefined;
        else if (playlist === 'soundcloudplaylist') return undefined;
        else if (playlist === 'false') {
            const member = message.author;
            let memberavatar = member.displayAvatarURL();
            let queueInfo = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setAuthor((name = `Added to queue`), (icon_url = `${memberavatar}`))
                .setTitle(`${song.title}`)
                .setURL(`${song.customurl}`)
                .setTimestamp()
                .setFooter(`${song.addedby}`);

            return message.channel.send({ embeds: [queueInfo] }).then((message) => {
                message.react('👍');
            });
        }
    }
    return undefined;
}

const skip = (message, args, client, server_queue, voiceChannel, Discord) => {
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

const disconnect = (message, args, client, server_queue, voiceChannel, Discord) => {
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
    server_queue.connection.destroy();
    const embed = new Discord.MessageEmbed()
        .setColor(roleColor(message))
        .setDescription(`**Succesfully disconnected from** \`${message.member.voice.channel.name}\``)
    return message.channel.send({ embeds: [embed] });
}

const np_song = (message, args, client, server_queue, voiceChannel, Discord) => {
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
    ${elapsedtime}<:transparent:875400047045525545>${splitbar(bar)}<:transparent:875400047045525545>${totaltime}`)
    message.channel.send({ embeds: [nowplayingembed] })
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}