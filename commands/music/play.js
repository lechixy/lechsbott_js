const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { YOUTUBE_API_KEY } = require("../util/lechsbottUtil");
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(YOUTUBE_API_KEY)

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'disconnect', 'dc', 'volume', 'nowplaying', 'np', 'queue', 'pause', 'resume', 'clearqueue', 'leave', 'remove', 'lyrics', 'skipto', 'search', 'shuffle'],
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(client, message, args, cmd, Discord){

        const cross = client.emojis.cache.get("846030611486474280");
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send(`${cross} You dont have the correct permissins`);
        if (!permissions.has('SPEAK')) return message.channel.send(`${cross} You dont have the correct permissins`);

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);
        const ytemoji = client.emojis.cache.get("846030610526634005");
        const spotifyemoji = client.emojis.cache.get("846030610929418310");

        let song = {};

        const lechsbottPlayer = async (guild, song) => {
            const song_queue = queue.get(guild.id);
            const Discord = require('discord.js')
        
            if (!song) {
                queue.delete(guild.id);
                song_queue.voice_channel.leave();
                return;
            }
        
        
            const stream = ytdl(song.url, { filter: 'audioonly' });
            song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
            .on('finish', () => {
                song_queue.songs.shift();
                lechsbottPlayer(guild, song_queue.songs[0]);
            });
            let playing = new Discord.MessageEmbed()
            .setAuthor(name= `Now playing`, icon_url= `${message.author.displayAvatarURL()}`)
            .setTitle(`${song.title}`)
            .setURL(`${song.url}`)
            .setTimestamp()
            await song_queue.text_channel.send(playing)
        }
        
        //If the user has used the play command
        if (cmd === 'play'){
            if (!args.length){
                let argsembed = new Discord.MessageEmbed()
                .setDescription('Didn\'t understand use **l!play**  \`a keyword for youtube search or a youtube link\`')
                return message.channel.send(argsembed)
            } 
  
            
            if (ytdl.validateURL(args[0])) {
                message.channel.send(`${ytemoji} **Searching** :mag_right: \`${args.join(' ')}\``)

                const song_info = await ytdl.getInfo(args[0]);
                song = {
                    url: song_info.videoDetails.video_url, 
                    title: song_info.videoDetails.title, 
                    id: song_info.videoDetails.videoId,
                };
            } else {
                message.channel.send(`${ytemoji} **Searching** :mag_right: \`${args.join(' ')}\``)
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = {
                        title: video.title, 
                        url: video.url,
                        id: video.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }
            }
            

           //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){
                
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    connection.voice.setSelfDeaf(true);
                    lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send(`${cross} There was an error connecting!`);
                    throw err;
                }
            } else {
                server_queue.songs.push(song)
                
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                    .setAuthor(name= `Added to queue [ @${member.username} ]`, icon_url= `${memberavatar}`)
                    .setTitle(`${song.title}`)
	                .setURL(`${song.url}`)
                    .setTimestamp()

                    message.channel.send(queueInfo).then(message => {
                        message.react('👍')
                    })
                
                
            }
        }
        //If the user has used the p command
        if (cmd === 'p'){
            if (!args.length){
                let argsembed = new Discord.MessageEmbed()
                .setDescription('Didn\'t understand use **l!play**  \`a keyword for youtube search or a youtube link\`')
                return message.channel.send(argsembed)
            } 
  
            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                message.channel.send(`${ytemoji} **Searching** :mag_right: \`${args.join(' ')}\``)

                const song_info = await ytdl.getInfo(args[0]);
                song = {
                    url: song_info.videoDetails.video_url, 
                    title: song_info.videoDetails.title, 
                    id: song_info.videoDetails.videoId,
                };
            } else {
                message.channel.send(`${ytemoji} **Searching** :mag_right: \`${args.join(' ')}\``)
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = {
                        title: video.title, 
                        url: video.url,
                        id: video.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }
            }
            

           //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){
                
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    connection.voice.setSelfDeaf(true);
                    lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send(`${cross} There was an error connecting!`);
                    throw err;
                }
            } else {
                server_queue.songs.push(song)
                
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                    .setAuthor(name= `Added to queue [ @${member.username} ]`, icon_url= `${memberavatar}`)
                    .setTitle(`${song.title}`)
	                .setURL(`${song.url}`)
                    .setTimestamp()

                    message.channel.send(queueInfo).then(message => {
                        message.react('👍')
                    })
                
                
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue, client);
        else if(cmd === 'disconnect') disconnect_song(message, server_queue, client);
        else if(cmd === 'dc') disconnect_song(message, server_queue, client);
        else if(cmd === 'volume') volume_song(message, server_queue, args, client);
        else if(cmd === 'nowplaying') np_song(message, server_queue, client);
        else if(cmd === 'np') np_song(message, server_queue, client);
        else if(cmd === 'queue') queue_song(message, server_queue, args, client);
        else if(cmd === 'pause') pause_song(message, server_queue, client);
        else if(cmd === 'resume') resume_song(message, server_queue, client);
        else if(cmd === 'clearqueue') clearqueue(message, server_queue, client);
        else if(cmd === 'leave') leavechannel(message, server_queue, client);
        else if(cmd === 'remove') remove_song(message, args, client, server_queue);
        else if(cmd === 'lyrics') lyrics(message, args, server_queue, client);
        else if(cmd === 'skipto') skipto(message, args, server_queue, client);
        else if(cmd === 'search') search_cmd(message, args, server_queue, client);
        else if(cmd === 'shuffle') shuffle_song(message, args, server_queue);
    }
    
}

const skip_song = (message, server_queue, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");
    
    if (!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue.songs[1]){
        return message.channel.send(`${cross} There is no more songs to skip if u want to add song use \`l!play or l!p\``);
    } else {
        let skippedembed = new Discord.MessageEmbed()
        .setDescription('**⏭️ Skipping**')
        message.channel.send(skippedembed)
        server_queue.connection.dispatcher.end();
    }
    
}

const disconnect_song = (message, server_queue, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");

    if (!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue){
        return message.channel.send(`${cross} There is no queue if you want the bot to leave the channel, use the \`l!leave\` command!`)
    } else {
        server_queue.songs = [];
        server_queue.connection.dispatcher.end();
        message.channel.send(`**📫 Succesfully disconnect from \`${message.member.voice.channel.name}\`**`)
    }  
}

const volume_song = (message, server_queue, args, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");
    server_queue.volume = 1

    if(!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)
    if(!args[0]) return message.channel.send(`The volume is: \`${server_queue.volume}\``)
    if(isNaN(args[0])) return message.channel.send(`${cross} That is not a valid amount to change the volume to!`)
    server_queue.volume = args[0]
    server_queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5)
    message.channel.send(`I have changed the volume to: \`${args[0]}\``)
}

const np_song = (message, server_queue, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");

    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)
    message.channel.send(`Now playing: **${server_queue.songs[0].title}**`)
}

const queue_song = (message, server_queue, args, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");

    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)

        let index = 1;
        let string = "";
    
            if(server_queue.songs[0]) string += `${server_queue.songs[0].title}\n`;
        
        let string1 = "";

            if(server_queue.songs[1]) string1 += `${server_queue.songs.slice(1, 10).map(x => `**${index++}-** ${x.title}`).join("\n")}`;

        if(!server_queue.songs[1]) {
            let npembed = new Discord.MessageEmbed()
            .addField('Currently playing', `${string}`)
            return message.channel.send(npembed)
        } else {
            let queueembed = new Discord.MessageEmbed()
            .setAuthor(`Current Queue for ${message.guild.name}`, message.guild.iconURL())
            .addField('Currently playing:', `${string}`)
            .addField('\u200B', '\u200B')
            .addField('All of queue:', `${string1}`)
            .setTimestamp()
            // .setThumbnail(server_queue.queue[0])
            return message.channel.send(queueembed)
    }
}

const pause_song = (message, server_queue, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");
    server_queue.playing = true
    server_queue.connection.dispatcher.resume()

    if(!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)
    if(!server_queue.playing) return message.channel.send(`${cross} Music is already paused!`)
    server_queue.playing = false
    server_queue.connection.dispatcher.pause()
    let pausedembed = new Discord.MessageEmbed()
    .setDescription('**⏸ Paused**')
    message.channel.send(pausedembed)
}

const resume_song = (message, server_queue, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");

    if(!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)
    if(server_queue.playing) return message.channel.send(`${cross} Music is already playing!`)
    server_queue.playing = true
    server_queue.connection.dispatcher.resume()
    let resumeembed = new Discord.MessageEmbed()
    .setDescription('**▶ Resuming**')
    message.channel.send(resumeembed)
}

const clearqueue = (message, server_queue, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");

    if(!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)
    server_queue.songs = [];
    let clearqueueembed = new Discord.MessageEmbed()
    .setDescription('**↩ Queue cleared!**')
    message.channel.send(clearqueueembed)
}

const leavechannel = async (message, server_queue, client) => {
    const voiceChannel = message.member.voice.channel;
    const tick = client.emojis.cache.get("846016813817266177");
    const cross = client.emojis.cache.get("846030611486474280");

    if(!voiceChannel) return message.channel.send("You need to be in a voice channel!");
    if(server_queue) return message.channel.send('This command can\'t using please try \`l!dc or l!disconnect\`')
        
    if(voiceChannel) { 
        if (client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
            await voiceChannel.leave()
            message.channel.send(`${tick} **Succesfully disconnect from \`${message.member.voice.channel.name}\`**`)
    } else {
            message.channel.send(`${cross} **Already lefted from \`${message.member.voice.channel.name}\`**`)
    }}
}

const remove_song = (message, args, client, server_queue) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");
    
    if(!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)
    if(!args.length) return message.channel.send(`${cross} 1 You need to type the queue number of the song: \`l!remove <song queue number>\``)
    if(args[0] > server_queue.songs.length) {
        return message.channel.send(`${cross} There is no song number you want to remove from the ranking: \`l!queue for queue info\``)
    }

    if(isNaN(args[0])) {
        return message.channel.send(`${cross} You need to type the queue number of the song: \`l!remove <song queue number>\``)
    } else {
        let deletedsong = args[0] - 1
        queue.songs.delete(deletedsong)
        let infoembed = new Discord.MessageEmbed()
        .setDescription(`**Removed ${server_queue.songs[args[0]].title} from queue!**`)
        message.channel.send(infoembed)
    }

}

const lyrics = async (message, args, server_queue, client) => {
    const Discord = require('discord.js')
    const lyricsFinder = require('lyrics-finder')
    const cross = client.emojis.cache.get("846030611486474280");
    
    if(!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)

    const title = args.join(" ")

    let loading = new Discord.MessageEmbed()
    .setDescription(`**Searching for lyrics of ${server_queue.songs[0].title}**...`)
    .setColor("ffffff")
    const m = await message.channel.send(loading);

    let lyrics = await lyricsFinder(title, "");

    if (!lyrics) {
        let errorembed = new Discord.MessageEmbed()
        .setDescription(`${cross} **Lyrics is not found!**`)
        .setColor("ffffff")
        m.edit(errorembed)
    } else {
        let lyricsEmbed = new Discord.MessageEmbed()
        .setTitle(`Lyrics of ${server_queue.songs[0].title}`)
        .setDescription(lyrics)
        .setColor("ffffff")
        .setTimestamp()

        if (lyricsEmbed.description.length >= 2048)
        lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
        return m.edit(lyricsEmbed)
    }
}

const skipto = (message, args, server_queue, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");
    
    if(!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)
    if(!args.length) return message.channel.send(`${cross} You need to type the queue number of the song: \`l!skipto <song queue number>\``)

    if(args[0] > server_queue.songs.length) {
        return message.channel.send(`${cross} There is no song number you want to remove from the ranking: \`l!queue for queue info\``)
    }

    if(isNaN(args[0])) {
        return message.channel.send(`${cross} You need to type the queue number of the song: \`l!remove <song queue number>\``)
    } else {
        server_queue.connection.dispatcher.end();
        const skippedsong = server_queue.songs[[args[0]] - 1]
        let infoembed = new Discord.MessageEmbed()
        .setDescription(`**Skipped to ${skippedsong.title} from queue!**`)
        message.channel.send(infoembed)
    }
}

const search_cmd = async (message, args, server_queue, client) => {
    const Discord = require('discord.js')
    const cross = client.emojis.cache.get("846030611486474280");
    const voice_channel = message.member.voice.channel;
    
    if(!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!args.length) return message.channel.send(`Wrong usage: \`l!search <keyword for search>\``)

    const video = await ytSearch(args.join(' '));
    const videos = video.videos.slice( 0, 10)
    let index = 0;

    let string1 = "";

            string1 += `${videos.map(x => `**${++index}-** ${x.title}`).join("\n")}`;

    let searchresult = new Discord.MessageEmbed()
    .setTitle(`Search results for ${args.join(' ')}`)
    .setDescription(string1)
    const m = await message.channel.send(searchresult);
    m.react('1️⃣')
    m.react('2️⃣')
    m.react('3️⃣')
    m.react('4️⃣')
    m.react('5️⃣')
    m.react('6️⃣')
    m.react('7️⃣')
    m.react('8️⃣')
    m.react('9️⃣')
    m.react('🔟')

    const filter = (reaction, user) => {
        return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].includes(reaction.emoji.name) && user.id === message.author.id;
    }

    m.awaitReactions(filter, {max: 1, time: 30000, errors: ["time"]}).then(
        async(collected) => {
            const reaction = collected.first()
            if(reaction.emoji.name === "1️⃣")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[0]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            } else if(reaction.emoji.name === "2️⃣")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[1]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            } else if(reaction.emoji.name === "3️⃣")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[2]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            } else if(reaction.emoji.name === "4️⃣")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[3]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            } else if(reaction.emoji.name === "5️⃣")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[4]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            } else if(reaction.emoji.name === "6️⃣")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[5]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            } else if(reaction.emoji.name === "7️⃣")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[6]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            } else if(reaction.emoji.name === "8️⃣")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[7]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            } else if(reaction.emoji.name === "9️⃣")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[8]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            } else if(reaction.emoji.name === "🔟")
            {
                const video = await ytSearch(args.join(' '));
                let sended = video.videos[9]

                if (sended){
                    song = {
                        title: sended.title, 
                        url: sended.url,
                        views: sended.views,
                        author: sended.author.name,
                        duration: sended.duration.timestamp,
                        id: sended.videoId,
                    }
                } else {
                     message.channel.send(`${cross} Error finding video`);
                }

                if (!server_queue){
                
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    
                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);
        
                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        connection.voice.setSelfDeaf(true);
                        lechsbottPlayer(message.guild, queue_constructor.songs[0]);
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send(`${cross} There was an error connecting!`);
                        throw err;
                    }
                } else {
                    server_queue.songs.push(song)
                    const member = message.author;
                    let memberavatar = member.displayAvatarURL()
                    let queueInfo = new Discord.MessageEmbed()
                        .setAuthor(name= `Added to queue`, icon_url= `${memberavatar}`)
                        .setTitle(`${song.title}`)
                        .setURL(`https://www.youtube.com/watch?v=${song.id}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`)
                        .addField('Duration', `${song.duration}`, true)
                        .addField('Views', `${song.views}`, true)
                        .addField('Channel', `${song.author}`, true)
                        .setTimestamp()
    
                        message.channel.send(queueInfo).then(message => {
                            message.react('👍')
                        })
                }
            }
        }
    )

    .catch(collected => {
        message.reply("Search reactions now disabled because you didn\'t select one of them!")
    })
        
    
}

const shuffle_song = async (message, args, server_queue) => {
    if(!message.member.voice.channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
    if(!server_queue) return message.channel.send(`${cross} There is nothing playing this server!`)

    if(!server_queue.songs[2]) return message.channel.send('There is only **two song** in queue for **shuffle** need to more than **2** songs!')

    let songs = queue.queue;
    for (let i = server_queue.songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
  }
}

