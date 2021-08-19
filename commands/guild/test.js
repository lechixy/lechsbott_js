const player = require('../../models/playerSchema');

module.exports = {
    name: 'test',
    description: '',
    async execute(client, message, args, cmd, Discord) {

        // profileData = await player.findOne({ Guild: message.guild.id })
        // if (!profileData) {
        //     let profile = await player.create({
        //         Guild: message.guild.id,
        //         voice_channel: message.member.voice.channel,
        //         text_channel: message.channel,
        //         player: 'test',
        //         connection: 'test1',
        //         songs: [],
        //         volume: '1',
        //         playing: 'true',
        //     })
        //     profile.save();
        // }

        const song = {
            title: 'SEZON 2 BETA - SARU BÖLÜM 12 ( YENİ KIYAFETLER )',
            url: 'https://www.youtube.com/watch?v=1luRJYDthvY',
            type: 'normal',
            app: 'YouTube',
            customurl: 'https://www.youtube.com/watch?v=1luRJYDthvY',
            addedby: 'lech',
            addedid: '37',
            duration: '2:50',
        };

        await player.findOneAndUpdate({ Guild: message.guild.id }, { $set: { player: 'se' } })
        
        console.log(a.songs[0])
        
    }
}