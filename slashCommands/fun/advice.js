module.exports = {
    name: 'advice',
    description: 'Give an advice that feels you happy!',
    // options: [
    // ],
    async execute(client, interaction, args, Discord) {
        
        const fetch = require('node-fetch');

        fetch('https://api.adviceslip.com/advice')
            .then(res => res.json())
                .then(json => {
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL({dynamic: true}))
                    .setDescription(json.slip.advice)
                    return interaction.followUp({ embeds: [embed], ephemeral: true });
                })
                
            .catch(err => {
                interaction.editReply('An error occurred while sending advice, please try again later');
            return console.error(err);
            });
        
        
 }
}