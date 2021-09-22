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
                    message.channel.send({ embeds: [embed] });
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
                        (icon_url = `${message.author.displayAvatarURL({ dynamic: true })}`)
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

exports.handleResource = handleResource