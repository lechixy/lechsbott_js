const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name:'nuke',
    description:'Destroys current channel and create new one!',
    async execute(client, message, args, cmd, Discord) {
        
        if(!message.member.permissions.has('MANAGE_CHANNELS')){
            const embed = new Discord.MessageEmbed()
            .setDescription(`**You are not able to use command need to** \`Manage Channels\``)
            return message.channel.send({ embeds: [embed] });
        }
        if(!message.guild.me.permissions.has('MANAGE_CHANNELS')){
            const embed = new Discord.MessageEmbed()
            .setDescription(`**Lechsbott needs to** \`Manage Channels\` **permission to execute this command!**`)
            return message.channel.send({ embeds: [embed] });
        }

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