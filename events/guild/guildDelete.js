module.exports = (Discord, client, guild) => {
    let leftedembed = new Discord.MessageEmbed()
    .setAuthor(`lechsbott`, `${client.user.displayAvatarURL()}`)
    .setTitle(`Hey <@${guild.ownerId}>`)
    .setDescription(`Leaved from **${guild.name}**!\nIf you want to invite **lechsbott** again use [\`this link\`](https://discord.com/api/oauth2/authorize?client_id=753906874729889853&permissions=8&scope=bot) to reinvite!`)
    .setTimestamp()
    guild.owner.send(leftedembed)
}