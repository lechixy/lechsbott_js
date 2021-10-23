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

        let emote = client.emojis.cache.get('899299715412291616')

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
                .setDescription(`${emote} **Searching for lyrics...**`)
            const m = await interaction.editReply({ embeds: [loading] });

            const media = await ytdl.getInfo(server_queue.songs[0].url)

            let ismedia = media.videoDetails.media?.song

            if (!ismedia) {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))
                    .setTitle(`**This video does not contain any songs**`)
                    .setDescription(`You can search lyrics manually within passing few arguments`)
                    .addField(`Usage`, `l!lyrics <song name/lyrics from song>`)
                return interaction.editReply({ embeds: [embed] });
            }

            let title = `${media.videoDetails.media?.song} - ${media.videoDetails.media?.artist}`

            let lyrics = await lyricsFinder(title, "");

            if (!lyrics) {
                let errorembed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))

                    .setDescription(`**Lyrics is not found!**`)
                m.edit({ embeds: [errorembed] })
            } else {
                let lyricsEmbed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))

                    .setAuthor(`${title}`)
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
                .setDescription(`${emote} **Searching for lyrics of ${title}**...`)
            interaction.editReply({ embeds: [loading] });

            let lyrics = await lyricsFinder(title, "");

            if (!lyrics) {
                let errorembed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))
                    .setDescription(`**Lyrics is not found with** \`${title}\``)
                interaction.editReply({ embeds: [errorembed] })
            } else {
                let lyricsEmbed = new Discord.MessageEmbed()
                    .setColor(roleColor(interaction))
                    .setAuthor(`${title}`)
                    .setDescription(lyrics)
                    .setTimestamp()

                if (lyricsEmbed.description.length >= 2048)
                    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
                return interaction.editReply({ embeds: [lyricsEmbed] })
            }
        }
    }
}