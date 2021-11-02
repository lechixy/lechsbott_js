async function songFinder(message, args, client, player, voiceChannel) {

    const ytdl = require('ytdl-core');
    const ytSearch = require('yt-search');
    const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID } = require("../../util/lechsbottUtil");
    const YouTube = require('simple-youtube-api');
    const youtube = new YouTube(YOUTUBE_API_KEY)
    const { getPreview, getTracks } = require('spotify-url-info')
    const scdl = require('soundcloud-downloader').default;
    const { SoundCloud } = require("scdl-core");
    const scdlcore = new SoundCloud();
    const { roleColor } = require('../../util/lechsbottFunctions')
    const { handleResource } = require('./handleResource')

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

    if (args[0].includes(scurl)) {
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
                    .setAuthor(`Playlist has been added to the queue!`, `${defineAuthor(message, 'displayAvatarURL')}`)
                    .setDescription(`Spotify Playlist within **${scdlinfoget.title} name** added with **${scdlinfoget.tracks.length} songs**`)
                    return findTypeAndSend({ embeds: [playlistembed] }).then((message) => {
                        message.react('👍');
                    });
                }

            } else if (!scdlinfoget) {
                let errorembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`${scemoji} Song or playlist isn't found on SoundCloud!`)
                return findTypeAndSend({ embeds: [errorembed] })
            }
        })
    }
    else if (args[0].includes(spotifyurl)) {
        findTypeAndSend(`${spotifyemoji} **Searching on Spotify** :mag_right: \`${args.join(' ')}\``)

        let spotify_finder

        try {
            spotify_finder = await getPreview(args[0])
        } catch (err) {
            console.log(err)

            return findTypeAndSend(`**Oops there is an error finding video, please try later!**`)
        }

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
    else if (args[0].includes(spotifyplaylisturl)) {
        findTypeAndSend(`${spotifyemoji} **Searching playlist** :mag_right: \`${args.join(' ')}\``)

        const data = await getTracks(args[0])

        const spoyt_finder = async (query) => {
            const video_result = await ytSearch(query);
            return (video_result.videos.length > 1) ? video_result.videos[0] : null;
        }

        let number = data.length

        for (const track of data) {
            const search_title = `${track.artists[0].name} - ${track.name}`

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
        .setAuthor(`Playlist has been added to the queue!`, `${defineAuthor(message, 'displayAvatarURL')}`)
        .setDescription(`Spotify Playlist added with **${number} songs**`)
        return findTypeAndSend({ embeds: [playlistembed] }).then((message) => {
            message.react('👍');
        });
    }
    else if (args[0].includes(playlisturl)) {
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
                duration: `${ytplaylist.duration.minutes}:${ytplaylist.duration.seconds}`,
            }

            await handleResource(song, message, args, voiceChannel, player, 'normal', 'youtubeplaylist', client)
        }
        let playlistembed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setAuthor(`Playlist has been added to the queue!`, `${defineAuthor(message, 'displayAvatarURL')}`)
            .setDescription(`YouTube Playlist within **${playlist.title} name** added with **${playlist.videos.length} songs**`)
            return findTypeAndSend({ embeds: [playlistembed] }).then((message) => {
                message.react('👍');
            });
    }

    else if (ytdl.validateURL(args[0])) {
        findTypeAndSend(
            `${ytemoji} **Searching for** \`${args.join(' ')}\``
        );

        let song_info, ytsinfo;

        try {
            song_info = await ytdl.getBasicInfo(args[0]);
            ytsinfo = await ytSearch({
                videoId: song_info.videoDetails.videoId,
            });
        } catch (err) {
            console.log(err)
            return findTypeAndSend(
                `**Oops there is an error finding video, please try later!**`
            );
        }


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
            return video_result.all.length > 1 ? video_result.all[0] : null;
        };

        const video = await video_finder(args.join(' '));
        if (video) {
            song = {
                title: video.title,
                url: video.url,
                type: 'normal',
                app: 'YouTube Search',
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