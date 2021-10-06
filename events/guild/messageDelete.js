module.exports = async (Discord, client, message) => {

    if(message.content === ''){

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle('Deleted An Embed Or An Attachment')
        .setDescription(`**Probably message content includes an attachment or embed**`)
        .addField(`Message Author`, `${message.author}`, true)
        .addField('User ID', `${message.author.id}`, true)
        .addField(`In`, `${message.channel}`, true)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        const logc = message.guild.channels.cache.find(ch => ch.name === 'message-log')
        if(!logc) return;
        logc.send({ embeds: [embed] });

    } else {
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle('Deleted Message')
        .setDescription(message.content)
        .addField(`Message Author`, `${message.author}`, true)
        .addField('User ID', `${message.author.id}`, true)
        .addField(`In`, `${message.channel}`, true)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        const logc = message.guild.channels.cache.find(ch => ch.name === 'message-log')
        if(!logc) return;
        logc.send({ embeds: [embed] });
    }
}