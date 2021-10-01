module.exports = (Discord, client, guild) => {
    let leftedembed = new Discord.MessageEmbed()
    .setAuthor(`lechsbott`, `${client.user.displayAvatarURL()}`)
    .setTitle(`Hey <@${guild.ownerId}>`)
    .setDescription(`Leaved from **${guild.name}**!\nIf you want to invite **lechsbott** again use \`l!invite\``)
    .setTimestamp()
    
    const owner = guild.members.cache.get(guild.ownerId)

    owner.send(leftedembed)
}