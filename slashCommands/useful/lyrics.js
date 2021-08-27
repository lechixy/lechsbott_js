const lyricsFinder = require('lyrics-finder')

module.exports = {
    name: 'lyrics',
    description: 'Search a songs lyrics',
    options: [
        {
            name: 'song',
            description: 'Which song do you want to search for lyrics?',
            type: 'STRING',
        }
    ],
    async execute(client, interaction, args, Discord) {
        

        if(!interaction.options._hoistedOptions.length){
            return
        } else {
            const title = args

            
            let loading = new Discord.MessageEmbed()
            .setDescription(`<a:loading:846030612254687253> **Searching for lyrics of ${title}**...`)
            interaction.editReply({ embeds: [loading] });

            let lyrics = await lyricsFinder(title, "");

            if (!lyrics) {
                let errorembed = new Discord.MessageEmbed()
                .setDescription(`**Lyrics is not found within** \`${title}\` **name**`)
                interaction.editReply({ embeds: [errorembed] })
            } else {
                let lyricsEmbed = new Discord.MessageEmbed()
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