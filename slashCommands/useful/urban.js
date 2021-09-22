const axios = require('axios')

module.exports = {
    name: 'dictionary',
    description: 'Search a word from Urban Dictionary',
    options: [
        {
            name: 'word',
            description: 'What do you want to search in urban dictionary?',
            type: 'STRING',
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {
        
        const query = encodeURIComponent(args);

        const {
            data: { list },
        } = await axios.get(
            `https://api.urbandictionary.com/v0/define?term=${query}`
        );

        const [ answer ] = list;

        const embed = new Discord.MessageEmbed()
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addField(`Definition`, trim(answer.definition), true)
        .addField(`Example`, trim(answer.example), true)
        .setFooter(`👍 ${answer.thumbs_up} 👎 ${answer.thumbs_down}`)
        interaction.followUp({ embeds: [embed] });
 }
}

function trim(input){
    return input.length > 1024 ? `${input.slice(0, 1020)} ...` : input;
}