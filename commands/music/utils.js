async function handleResource(video, message, args, voice_channel, player, type, playlist, client) {
    const Discord = require('discord.js');
    const playdl = require('play-dl')
    const { roleColor } = require('../util/lechsbottFunctions')
    const Voice = require('@discordjs/voice')

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

    function findTypeAndSend(content){
        if(message.type !== 'APPLICATION_COMMAND'){
            return message.channel.send(content)
        } else {
            return message.followUp(content)
        }
    }


    function defineAuthor(msg, value){
        if(msg.type !== 'APPLICATION_COMMAND'){
            let checkvalue = {
                "username": msg.author.username,
                "id": msg.author.id,
                "displayAvatarURL": msg.author.displayAvatarURL({ dynamic: true })
            }

            return checkvalue[value]
        } else {
            let checkvalue = {
                "username": msg.user.username,
                "id": msg.user.id,
                "displayAvatarURL": msg.user.displayAvatarURL({ dynamic: true })
            }

            return checkvalue[value]

        }
    }

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
            playinginfo: true,
        }

        //Add our key and value pair into the global queue. We then use this to get our server queue.
        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);

        const lechsbottPlayer = async (guild, song) => {
            const queue = client.queue
            if (!song) {
                queue.delete(guild.id);
                console.log('deleted song queue because no song');
                return;
            }

            const song_queue = queue.get(message.guild.id)
            console.log(song)

            if (song_queue.voice_channel.type === 'GUILD_STAGE_VOICE') {
                message.guild.me.voice.setSuppressed(false)
            }

            if (song.type === 'normal') {
                // const stream = ytdl(song.url, { filter: 'audioonly', highWaterMark: 32, quality: 'highestaudio', });
                let stream = await playdl.stream(song.url)

                let resource = Voice.createAudioResource(stream.stream, {
                    inputType: stream.type
                })
                queue_constructor.resource = resource;

                player.subscribe(song_queue.player);
                song_queue.player.play(resource);
            }
            if (song.type === 'sc') {

                let stream
                try {
                    stream = await scdlcore.download(song.url)
                } catch (e) {
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**There is a problem with the** \`${song_queue.songs[0].title}\`\nIf next track available player skip to it!`)
                    findTypeAndSend({ embeds: [embed] });
                    song_queue.songs.shift()

                    if (song_queue.songs[0]) {
                        lechsbottPlayer(message.guild, song_queue.songs[0]);
                    } else {
                        queue.delete(guild.id);
                        song_queue.player.stop(true);
                        console.log('deleted song queue because of error');
                    }
                    return
                }
            }

            // song_queue.connection.on('stateChange', async (oldState, newState) => {
            //     console.log(
            //         `Connection transitioned from ${oldState.status} to ${newState.status}`
            //     );

            //     if (oldState.status === 'ready' && newState.status === 'disconnected') {
            //         queue.delete(guild.id)
            //         song_queue.player.stop(true);
            //         console.log('deleted song queue');
            //         return
            //     }
            // })

            if (song_queue.playinginfo === true) {
                let playing = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setAuthor(
                        (name = `Now playing`),
                        (icon_url = `${defineAuthor(message, 'displayAvatarURL')}`)
                    )
                    .setTitle(`${song.title}`)
                    .setURL(`${song.customurl}`)
                    .setFooter(`${song.addedby}`)
                    .setTimestamp();

                song_queue.text_channel.send({ embeds: [playing] })
            }

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

            queue_constructor.player.on(Voice.AudioPlayerStatus.Idle, async () => {
                console.log(
                    `Audio player transitioned idle`
                );

                queue_constructor.songs.shift();
                lechsbottPlayer(message.guild, queue_constructor.songs[0]);
            });

        } catch (err) {
            queue.delete(message.guild.id);
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`**There was an error connecting!**`)
            findTypeAndSend(embed);
            throw new Error(err)
        }
    } else {
        server_queue.songs.push(song)

        if (playlist === 'youtubeplaylist') return undefined;
        else if (playlist === 'spotifyplaylist') return undefined;
        else if (playlist === 'soundcloudplaylist') return undefined;
        else if (playlist === 'false') {
            
            let memberavatar = defineAuthor(message, 'displayAvatarURL')
            let queueInfo = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setAuthor((name = `Added to queue`), (icon_url = `${memberavatar}`))
                .setTitle(`${song.title}`)
                .setURL(`${song.customurl}`)
                .setTimestamp()
                .setFooter(`${song.addedby}`);

            return findTypeAndSend({ embeds: [queueInfo] }).then((message) => {
                message.react('👍');
            });
        }
    }
    return undefined;
}

exports.handleResource = handleResource

async function songFinder(message, args, client, player, voiceChannel) {

    const ytdl = require('ytdl-core');
    const ytSearch = require('yt-search');
    const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID } = require("../util/lechsbottUtil");
    const YouTube = require('simple-youtube-api');
    const youtube = new YouTube(YOUTUBE_API_KEY)
    const { getPreview, getTracks } = require('spotify-url-info')
    const scdl = require('soundcloud-downloader').default;
    const { SoundCloud } = require("scdl-core");
    const scdlcore = new SoundCloud();

    const Discord = require('discord.js');
    const ytemoji = client.emojis.cache.get("846030610526634005");
    const spotifyemoji = client.emojis.cache.get("846030610929418310");
    const scemoji = client.emojis.cache.get("865548940694519819");
    const playlisturl = 'https://www.youtube.com/playlist?list=';
    const spotifyurl = 'https://open.spotify.com/track/';
    const spotifyplaylisturl = "https://open.spotify.com/playlist/";
    const scurl = 'https://soundcloud.com/'
    const yturl = 'https://www.youtube.com/'

    let song = {};

    if(typeof args === 'string'){
        args = args.split(' ')
    }

    function findTypeAndSend(content){
        if(message.type !== 'APPLICATION_COMMAND'){
            return message.channel.send(content)
        } else {
            return message.followUp(content)
        }
    }


    function defineAuthor(msg, value){
        if(msg.type !== 'APPLICATION_COMMAND'){
            let checkvalue = {
                "username": msg.author.username,
                "id": msg.author.id,
                "displayAvatarURL": msg.author.displayAvatarURL({ dynamic: true })
            }

            return checkvalue[value]
        } else {
            let checkvalue = {
                "username": msg.user.username,
                "id": msg.user.id,
                "displayAvatarURL": msg.user.displayAvatarURL({ dynamic: true })
            }

            return checkvalue[value]

        }
    }

    if (args.includes(scurl)) {
        findTypeAndSend(`${scemoji} **Searching on SoundCloud** :mag_right: \`${args.join(' ')}\``)

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
                        addedby: defineAuthor(message, 'username'),
                        addedid: defineAuthor(message, 'id'),
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
                            addedby: defineAuthor(message, 'username'),
                            addedid: defineAuthor(message, 'id'),
                            duration: `${moment.duration(durationvideo).minutes()}:${formatTime(moment.duration(durationvideo).seconds())}`
                        }
                        await handleResource(song, message, args, voiceChannel, player, 'sc', 'soundcloudplaylist', client)
                    }

                    let playlistembed = new Discord.MessageEmbed()
                        .setColor(roleColor(message))
                        .setAuthor(`SoundCloud playlist has been added to the queue with ${scdlinfoget.tracks.length} songs!`, `${defineAuthor(message, 'displayAvatarURL')}`)
                    return findTypeAndSend({ embeds: [playlistembed] })
                }

            } else if (!scdlinfoget) {
                let errorembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`${scemoji} Song or playlist isn't found on SoundCloud!`)
                return findTypeAndSend({ embeds: [errorembed] })
            }
        })
    }
    else if (args.includes(spotifyurl)) {
        findTypeAndSend(`${spotifyemoji} **Searching on Spotify** :mag_right: \`${args.join(' ')}\``)

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
                addedby: defineAuthor(message, 'username'),
                addedid: defineAuthor(message, 'id'),
                duration: spoytvid.duration.timestamp,
            }
        } else {
            let errorembed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setDescription(`${spotifyemoji} Song isn't found on Spotify!`)
            return findTypeAndSend({ embeds: [errorembed] })
        }
        await handleResource(song, message, args, voiceChannel, player, 'normal', 'false', client)
    }
    else if (args.includes(spotifyplaylisturl)) {
        findTypeAndSend(`${spotifyemoji} **Searching playlist** :mag_right: \`${args.join(' ')}\``)

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
                    addedby: defineAuthor(message, 'username'),
                    addedid: defineAuthor(message, 'id'),
                    duration: spotifyplaylist.duration.timestamp,
                }
                await handleResource(song, message, args, voiceChannel, player, 'normal', 'spotifyplaylist', client)
            } else {
                let errorembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`${spotifyemoji} Playlist isn't found on Spotify!`)
                findTypeAndSend({ embeds: [errorembed] })
            }
        }

        let playlistembed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setAuthor(`Spotify playlist has been added to the queue with ${number} songs!`, `${defineAuthor(message, 'displayAvatarURL')}`)
        return findTypeAndSend({ embeds: [playlistembed] })
    }
    else if (args.includes(playlisturl)) {
        findTypeAndSend(`${ytemoji} **Searching playlist** :mag_right: \`${args.join(' ')}\``)

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
                addedby: defineAuthor(message, 'username'),
                addedid: defineAuthor(message, 'id'),
                duration: `${ytplaylist.duration.minutes}:${ytplaylist.durationSeconds}`,
            }

            await handleResource(song, message, args, voiceChannel, player, 'normal', 'youtubeplaylist', client)
        }
        let playlistembed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setAuthor(`Youtube playlist has been added to the queue with ${playlist.videos.length} songs!`, `${defineAuthor(message, 'displayAvatarURL')}`)
        return findTypeAndSend({ embeds: [playlistembed] })
    }

    else if (args.includes(yturl) || ytdl.validateURL(args[0])) {
        findTypeAndSend(
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
            addedby: defineAuthor(message, 'username'),
            addedid: defineAuthor(message, 'id'),
            duration: ytsinfo.duration.timestamp,
        };
        await handleResource(song, message, args, voiceChannel, player, 'normal', 'false', client);
    } else {
        findTypeAndSend(
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
                addedby: defineAuthor(message, 'username'),
                addedid: defineAuthor(message, 'id'),
                duration: video.duration.timestamp,
            };
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message)).setDescription(
                    `**No videos found within** \`${args.join(' ')}\` on YouTube!`
                );
            return findTypeAndSend({ embeds: [embed] });
        }
        await handleResource(song, message, args, voiceChannel, player, 'normal', 'false', client)
    }
}

exports.songFinder = songFinder;