const translate = require("@iamtraction/google-translate")

module.exports = {
    name: 'translate',
    description: 'Translate a query to English Language',
    options: [
        {
            name: 'eng',
            description: 'Translate query to English',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'query',
                    description: 'What do you want to translate into English?',
                    type: 'STRING',
                    required: true
                }
            ]
        }
    ],
    async execute(client, interaction, args, Discord) {
        
        const query = interaction.options._hoistedOptions[0].value

        const translated = await translate(query, { to: 'en' });

        let translatedembed = new Discord.MessageEmbed()
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(translated.text)
        interaction.followUp({ embeds: [translatedembed] })
 }
}