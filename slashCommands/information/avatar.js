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

        const selection = interaction.options.getMember('user')

        if (!selection) {
            let avatar = interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })

            let avatarEmbed = new Discord.MessageEmbed()
                .setAuthor(`${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                .setImage(avatar)
            return interaction.followUp({ embeds: [avatarEmbed] })
        } else {
            let avatar = selection.user.displayAvatarURL({ dynamic: true, size: 1024 })

            let avatarEmbed = new Discord.MessageEmbed()
                .setAuthor(`${selection.user.tag}`, selection.displayAvatarURL({ dynamic: true }))
                .setImage(avatar)
            return interaction.followUp({ embeds: [avatarEmbed] })
        }
    }
}