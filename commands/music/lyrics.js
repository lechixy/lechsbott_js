const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')
const ytdl = require('ytdl-core')
const lyricsFinder = require('lyrics-finder')

module.exports = {
    name: 'lyrics',
    description: '',
    async execute(client, message, args, cmd, Discord) {

        if (!args[0]) {
            const queue = client.queue
            const server_queue = queue.get(message.guild.id)

            if (!server_queue) {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`**There is nothing playing on this server**`)
                return message.channel.send({ embeds: [embed] });
            }

            let loading = new Discord.MessageEmbed()
                .setDescription(`<a:loading:846030612254687253> **Searching for lyrics...**`)
            const m = await message.channel.send({ embeds: [loading] });

            const media = await ytdl.getInfo(server_queue.songs[0].url)

            let ismedia = media.videoDetails.media?.song

            if(!ismedia){
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`**This video does not contain any songs**`)
                return m.edit({ embeds: [embed] });
            }

            let title = `${media.videoDetails.media?.artist} ${media.videoDetails.media?.song}`

            let lyrics = await lyricsFinder(title, "");

            if (!lyrics) {
                let errorembed = new Discord.MessageEmbed()
                    .setDescription(`**Lyrics is not found!**`)
                m.edit({ embeds: [errorembed] })
            } else {
                let lyricsEmbed = new Discord.MessageEmbed()
                    .setTitle(`Lyrics of ${title}`)
                    .setDescription(lyrics)
                    .setTimestamp()

                if (lyricsEmbed.description.length >= 2048)
                    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
                return m.edit({ embeds: [lyricsEmbed] })
            }

        } else {
            const title = args.join(" ")

            let loading = new Discord.MessageEmbed()
                .setDescription(`<a:loading:846030612254687253> **Searching for lyrics of ${title}**...`)
            const m = await message.channel.send({ embeds: [loading] });

            lyrics = await lyricsFinder(title, "");

            if (!lyrics) {
                let errorembed = new Discord.MessageEmbed()
                    .setDescription(`${cross} **Lyrics is not found!**`)
                m.edit({ embeds: [errorembed] })
            } else {
                let lyricsEmbed = new Discord.MessageEmbed()
                    .setTitle(`Lyrics`)
                    .setDescription(lyrics)
                    .setTimestamp()

                if (lyricsEmbed.description.length >= 2048)
                    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
                return m.edit({ embeds: [lyricsEmbed] })
            }
        }


    }
}