const { MessageEmbed } = require('discord.js')
const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name:'invite',
    aliases:['lechsbott'],
    description:'',
    category: ['lechsbott'],
    async execute(client, message, args, cmd, Discord) {

        let invitelink = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
        
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setStyle("LINK")
                .setLabel('Click to invite')
                .setEmoji("🎁")
                .setURL(`${invitelink}`)
            )

        const embed = new MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({dynamic: true}))
        .setTitle(`Here is a invite link for you ${message.author.username}`)
        .setURL(invitelink)
        .setColor(roleColor(message))
        .setDescription(`Just click button to add ${client.user.username} your server :blush:`)
        message.channel.send({ embeds: [embed], components: [row] });
        
        
  }
}