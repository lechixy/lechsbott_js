const imdb = require("imdb-api");
const { PREFIX } = require("../util/lechsbottUtil");

module.exports = {
    name: "imdb",
    description: "Get the information about series and movie",
    category: ['Information'],
    async execute(client, message, args, cmd, Discord) {

        if (!args.length) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`**What you want film and series search on IMDB?**`)
            .addField(`Usage`, `${PREFIX}${cmd} <film or series>`, true)
            message.channel.send({ embeds: [embed] });
        }

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
            message.channel.send({ embeds: [embed] })

        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setDescription(`There is no film or series for **${value}** in IMDB\nTry find different something or please sure typed correctly`)
            return message.channel.send({ embeds: [embed] });
        }
    }
}