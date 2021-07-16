module.exports = {
    name: 'configtest',
    description: 'a',
    async execute(client, message, args, cmd, Discord) {
        let leftedembed = new Discord.MessageEmbed()
        .setAuthor(`lechsbott`, `${client.user.displayAvatarURL()}`)
        .setDescription(`Leaved from **${message.guild.name}**!\nIf you need to invite **lechsbott** again use [\`this link\`](https://discord.com/api/oauth2/authorize?client_id=753906874729889853&permissions=8&scope=bot)`)
        .setTimestamp()
        message.channel.send(leftedembed)
    }
}