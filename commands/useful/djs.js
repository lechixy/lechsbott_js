const axios = require('axios')
const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name:'djs',
    aliases:['djdocs', 'docs'],
    description:'',
    async execute(client, message, args, cmd, Discord) {
      
        const query = args.join(' ')
        if(!query){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`You need to specify djs category to find somethings!`, message.author.displayAvatarURL({dynamic: true}))
            .addField(`Usage`, `${PREFIX}${cmd} <category/properties/class>`, true)
            return message.channel.send({ embeds: [embed] });
        }
      
        const url = `https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(query)}`

        axios.get(url).then(({data}) => {
            if(data) {
                message.channel.send({ embeds: [data] });
            }
        })
  }
}