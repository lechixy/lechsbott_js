module.exports = {
    name: 'firstmessage',
    description: 'Sends first message of interactions channel',
    async execute(client, interaction, args, Discord) {
        const fetchMessages = await interaction.channel.messages.fetch({after: 1, limit: 1})
        const msg = fetchMessages.first();

        
        const embed = new Discord.MessageEmbed()
        .setTitle(`First message in ${interaction.channel.name}`)
        .setURL(msg.url)
        .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${msg.content}`)
        .addField('\u200b', '**Message Details**')
        .addField('Author', `<@${msg.author.id}>`, true)
        .addField('Created At', msg.createdAt.toLocaleDateString(), true)
        .addField('Go to message', `[Click](${msg.url})`, true)
        interaction.followUp({ embeds: [embed] });
    }
}