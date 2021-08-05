module.exports = async (Discord, client, message) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Deleted Message')
    .setDescription(message.content)
    .addField(`Deleted by`, `${message.author}`, true)
    .addField('Deleted ID', `${message.author.id}`, true)
    .addField(`In`, `${message.channel}`, true)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    const logc = message.guild.channels.cache.find(ch => ch.name === 'message-log')
    if(!logc) return;
    logc.send({ embeds: [embed] });
}