module.exports = {
    name: 'firstmessage',
    aliases: 'guildfirstmessage',
    description: 'Display first message of guild!',
    async execute(client, message, args, cmd, Discord) {
        const fetchMessages = await message.channel.messages.fetch({after: 1, limit: 1})
        const msg = fetchMessages.first();

        const embed = new Discord.MessageEmbed()
        .setTitle(`First Message in ${message.guild.name}`)
        .setURL(msg.url)
        .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
        .setDescription(`Content:\n${msg.content}`)
        .addField('Author', msg.author, true)
        .addField('Message ID', msg.id, true)
        .addField('Created At', message.createdAt.toLocaleDateString(), true)
        message.channel.send(embed);
    }
}