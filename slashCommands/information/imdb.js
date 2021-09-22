const imdb = require("imdb-api");

module.exports = {
    name: 'imdb',
    description: 'Get the information about series and movie from IMDB',
    options: [
        {
            name: 'search',
            description: 'What you want film and series search on IMDB?',
            type: 'STRING',
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {

        const value = interaction.options.getString('search', true);

        const imob = new imdb.Client({ apiKey: "5e36f0db" }) //You need to paste you imdb api

        try {

            let movie = await imob.get({ 'name': value })

            let embed = new Discord.MessageEmbed()
                .setTitle(`${movie.title} (${movie.rating})`)
                .setThumbnail(movie.poster)
                .setColor('RANDOM')
                .setDescription(movie.plot)
                .addField("Country", movie.country, true)
                .addField("Languages", movie.languages, true)
                .addField("Type", movie.type, true);
            interaction.followUp({ embeds: [embed] })

        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setDescription(`There is no film or series for **${value}** in IMDB\nTry find different something or please sure typed correctly`)
            return interaction.followUp({ embeds: [embed] });
        }
    }
}
