const fetch = require('node-fetch')
const { GIPHY_API_KEY } = require('../../commands/util/lechsbottUtil')

module.exports = {
    name: 'gif',
    description: 'Get a gif from Giphy!',
    options: [
        {
            name: 'query',
            description: 'What you want get from Giphy?',
            type: 'STRING',
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {
        
        const searchquery = args

        const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchquery)}&limit=1`
    
        fetch(url)
        .then(res => res.json())
        .then(json => {
            if(json.meta.status === 200){
                return interaction.followUp({ content: `${json.data[0].url}` })
            }
            if(json.meta.status === 404){
                const embed = new Discord.MessageEmbed()
                .setDescription(`**Not found any gif within ${query} name on Giphy**\nPlease sure type search term/query correctly`)
                return interaction.followUp({ embeds: [embed] });
            }
        })
        
        
 }
}