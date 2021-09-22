const lyricsFinder = require('lyrics-finder')
const ytdl = require('ytdl-core')
const { roleColor } = require('../../commands/util/lechsbottFunctions')

module.exports = {
    name: 'lyrics',
    description: 'Show currently playing song lyrics',
    options: [
        {
            name: 'song',
            description: 'Which song do you want to search for lyrics?',
            type: 'STRING',
        }
    ],
    async execute(client, interaction, args, Discord) {


        if (!interaction.options.getString('song')) {

            const queue = client.queue
            const server_queue = queue.get(interaction.guild.id)

            if (!server_queue) {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))
                    .setDescription(`**There is nothing playing on this server**`)
                return interaction.editReply({ embeds: [embed] });
            }

            let loading = new Discord.MessageEmbed()
                .setColor(roleColor(interaction))
                .setDescription(`<a:loading:846030612254687253> **Searching for lyrics...**`)
            const m = await interaction.editReply({ embeds: [loading] });

            const media = await ytdl.getInfo(server_queue.songs[0].url)

            let title = media.videoDetails.media?.song

            if (!title) {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))
                    .setDescription(`**This video does not contain any songs**`)
                return interaction.editReply({ embeds: [embed] });
            }

            let lyrics = await lyricsFinder(title, "");

            if (!lyrics) {
                let errorembed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))
                    .setDescription(`**Lyrics is not found!**`)
                m.edit({ embeds: [errorembed] })
            } else {
                let lyricsEmbed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))
                    .setTitle(`Lyrics of ${title}`)
                    .setDescription(lyrics)
                    .setTimestamp()

                if (lyricsEmbed.description.length >= 2048)
                    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
                return m.edit({ embeds: [lyricsEmbed] })
            }


        } else {
            const title = interaction.options.getString('song')


            let loading = new Discord.MessageEmbed()
                .setColor(roleColor(interaction))
                .setDescription(`<a:loading:846030612254687253> **Searching for lyrics of ${title}**...`)
            interaction.editReply({ embeds: [loading] });

            let lyrics = await lyricsFinder(title, "");

            if (!lyrics) {
                let errorembed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))
                    .setDescription(`**Lyrics is not found within** \`${title}\` **name**`)
                interaction.editReply({ embeds: [errorembed] })
            } else {
                let lyricsEmbed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))
                    .setTitle(`Lyric search result for ${title}`)
                    .setDescription(lyrics)
                    .setTimestamp()

                if (lyricsEmbed.description.length >= 2048)
                    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
                return interaction.editReply({ embeds: [lyricsEmbed] })
            }
        }
    }
}