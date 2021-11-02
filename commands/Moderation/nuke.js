const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name:'nuke',
    description:'Destroys current channel and creates new one!',
    category: ['Moderation'],
    arguments: `<none>`,
    userPerms: ['MANAGE_CHANNELS'],
    clientPerms: ['MANAGE_CHANNELS'],
    async execute(client, message, args, cmd, Discord) {

        message.channel.clone().then(ch => {
            ch.setParent(message.channel.parent.id)
            ch.setPosition(message.channel.position)
            message.channel.delete()
            
            const embed = new Discord.MessageEmbed()
            .setDescription(`**This channel has been nuked by ${message.author}**`)
            return ch.send({ embeds: [embed] });
        })
        
        
  }
}