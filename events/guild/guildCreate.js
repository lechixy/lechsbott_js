module.exports = (Discord, client, guild) => {

    let invitelink = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`

    const invite = new Discord.MessageButton()
        .setLabel('Invite')
        .setStyle('LINK')
        .setEmoji('🎁')
        .setURL(`${invitelink}`)

    const row = new Discord.MessageActionRow()
        .addComponents(invite)

    let embed = new Discord.MessageEmbed()
        .setTitle(`Thanks for adding me to ${guild.name}!`)
        .setDescription(`\n*My prefix is:* \`l!\`\n\n*To get started type* \`l!help\``)
        .setColor(roleColor(message))

    const channeltosend = guild.channels.cache.find(ch => ch.type === "GUILD_TEXT" && ch.permissionsFor(client.user.id).has(["SEND_MESSAGES", "EMBED_LINKS"]))
    if (!channeltosend) return
    channeltosend.send({ embeds: [embed], components: [row] })

}