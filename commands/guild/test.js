const {lechs_paginator} = require('../util/lechsbottPaginator')

module.exports = {
    name: 'test',
    description: '',
    async execute(client, message, args, cmd, Discord) {

        message.delete()

        const embed = new Discord.MessageEmbed()
        .setDescription(`**Anime rolü almak ve o süper gizli harika kanalı görmek için tepkiye tıkla!**`)
        .setColor('#E100FF')
        message.channel.send({ embeds: [embed] });
        
    }
}