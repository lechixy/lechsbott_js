const fetch = require('node-fetch')
const { PREFIX, GIPHY_API_KEY } = require('../util/lechsbottUtil')

module.exports = {
    name:'gif',
    aliases:['searchgif', 'gifs', 'searchgifs'],
    description:'',
    async execute(client, message, args, cmd, Discord) {

        if(['gif', 'searchgif'].includes(cmd)){
            const query = args.join(' ')
            if(!query){
                const embed = new Discord.MessageEmbed()
                .setDescription(`**You need to query to find somethings!**`)
                .addField(`Usage`, `${PREFIX}${cmd} <search on giphy>`, true)
                return message.channel.send({ embeds: [embed] });
            }
          
            const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=1`
    
            fetch(url)
            .then(res => res.json())
            .then(json => {
                if(json.meta.status === 200){
                    return message.reply({ content: `${json.data[0].url}` })
                }
                if(json.meta.status === 404){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`**Not found any gif within ${query} name on Giphy**\nPlease sure type search term/query correctly`)
                    return message.channel.send({ embeds: [embed] });
                }
            })
        } else if(['gifs', 'searchgifs'].includes(cmd)){

            
            if(!args[0] || isNaN(args[0])){
                const embed = new Discord.MessageEmbed()
                .setDescription(`**You need to specify limit(number) to find somethings!**`)
                .addField(`Usage`, `${PREFIX}${cmd} <limit(number)> <search on giphy>`, true)
                return message.channel.send({ embeds: [embed] });
            }
            const query = args.slice(1).join(' ')

            if(!query){
                const embed = new Discord.MessageEmbed()
                .setDescription(`**You need to query to find somethings!**`)
                .addField(`Usage`, `${PREFIX}${cmd} <how much gifs will send(number)> <search on giphy>`, true)
                return message.channel.send({ embeds: [embed] });
            }
            if(args[0] > 10 || args[0] < 0){
                const embed = new Discord.MessageEmbed()
                .setDescription(`**Limit must be between 0 and 10**`)
                .addField(`Usage`, `${PREFIX}${cmd} <limit(number between 0-10)> <search on giphy>`, true)
                return message.channel.send({ embeds: [embed] });
            }

            const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=${args[0]}`
    
            fetch(url)
            .then(res => res.json())
            .then(json => {
                if(json.meta.status === 200){
                    json.data.forEach(gif => {
                        return message.reply({ content: `${gif.url}` })
                    })

                }
                if(json.meta.status === 404 || !json.data.length){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`**Not found any gif within ${query} name on Giphy**\nPlease sure type search term/query correctly`)
                    return message.channel.send({ embeds: [embed] });
                }
            })
        }
    }
}