const { PREFIX } = require('../util/lechsbottUtil')
const djv = require('@discordjs/voice')
const ytdl = require('ytdl-core')

module.exports = {
    name:'v13test',
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        const voice_channel = message.member.voice.channel
        
        const connection = djv.joinVoiceChannel({
            channelId: voice_channel.id,
            guildId: voice_channel.guild.id,
            adapterCreator: voice_channel.guild.voiceAdapterCreator,
        })


        djv.entersState(connection, djv.VoiceConnectionStatus.Ready, 30000).then(() => {
            ytdl.getInfo(args[0]).then(video => {
                let song = { 
                    title: video.videoDetails.title, 
                    url: video.videoDetails.video_url, 
                    author: message.author.id 
                }

                let stream = ytdl(song.url, { filter: 'audioonly' });

                let resource = djv.createAudioResource(stream);

                player.play(resource);

                djv.entersState(player, ready, 5000);
            })
        })
  }
}