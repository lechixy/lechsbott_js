module.exports = {
    name: 'dice',
    description: 'Throw a dice, thats mean you get a randomly number',
    options: [
        {
            name: 'sides',
            description: 'how many sides will the dice have',
            type: 'NUMBER',
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {
        
        const hmf = args
        const randomednumber = Math.floor(Math.random() * hmf+1)

        let resultembed = new Discord.MessageEmbed()
        .setDescription(`🎲 **${interaction.user.username}** rolled the **${hmf}-sided** dice: **${randomednumber}** came`)
        interaction.followUp({ embeds: [resultembed] })
        
        
 }
}