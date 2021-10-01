const Discord = require('discord.js')

module.exports = {
    name: 'Show Avatar',
    type: "USER",
    async execute(client, interaction, Discord) {

        const user = client.users.cache.get(interaction.targetId);

        
        const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
        .setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
        return interaction.followUp({ embeds: [embed] });


    }
}