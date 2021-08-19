const math = require("mathjs")

module.exports = {
    name: 'math',
    description: 'Have lechsbott do the math',
    options: [
        {
            name: 'operation',
            description: 'Which operation would you like to do?',
            type: 'STRING',
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {
        
        const process = interaction.options._hoistedOptions[0].value
        const user = interaction.user

        try {
            let result = new Discord.MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
            .addField(`Question`, process, true)
            .addField(`Solution`, `${math.evaluate(process)}`, true)
            interaction.followUp({ embeds: [result] })
        } catch(e) {
            console.log(e)
            let errorembed = new Discord.MessageEmbed()
            .setAuthor(`Question is not valid!`, user.displayAvatarURL({dynamic: true}))
            .setDescription(`**${process}**`)
            interaction.followUp({ embeds: [errorembed] })
        }
        
        
 }
}