module.exports = {
    name: 'avatar',
    description: 'Display your avatar or a members avatar!',
    options: [
        {
            name: 'user',
            description: 'Whose avatar would you like to see?',
            type: 'USER',
        }
    ],
    async execute(client, interaction, args, Discord) {
        
        const selection = interaction.options._hoistedOptions
        
        if(!selection.length){
            let avatar = interaction.user.displayAvatarURL({dynamic: true ,size: 1024})

            let avatarEmbed = new Discord.MessageEmbed()
            .setAuthor(`${interaction.user.tag}`, interaction.user.displayAvatarURL({dynamic: true}))
            .setImage(avatar)
            .setTimestamp()
            
            interaction.followUp({ embeds: [avatarEmbed] })
        } else {
            let userget = interaction.guild.members.cache.get(selection[0].user.id)
            let avatar = userget.displayAvatarURL({dynamic: true ,size: 1024})

            let avatarEmbed = new Discord.MessageEmbed()
            .setAuthor(`${selection[0].user.tag}`, userget.displayAvatarURL({dynamic: true}))
            .setImage(avatar)
            .setTimestamp()
            
            interaction.followUp({ embeds: [avatarEmbed] })
        }
        
        
 }
}