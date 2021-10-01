module.exports = (Discord, client, guild) => {
    let joinedembed = new Discord.MessageEmbed()
    .setAuthor(`lechsbott`, `${client.user.displayAvatarURL()}`)
    .setTitle(`Hey <@${guild.ownerId}>`)
    .setDescription(`Joined to **${guild.name}**!\nIf you need anything about **lechsbott** just type \`l!help\` to guild chat!`)
    .setTimestamp()

    const owner = guild.members.cache.get(guild.ownerId)

    owner.send(joinedembed)
}