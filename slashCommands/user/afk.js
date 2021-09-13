const { interactionEmbed } = require('discord.js');
const db = require('../../models/afkSchema');
const moment = require('moment')

module.exports = {
    name: 'afk',
    description: 'Set your status to afk, it can be very useful!',
    options: [
         {
             name: 'reason',
             description: 'Enter a reason, why you are afk?',
             type: 'STRING',
             required: false
         }
    ],
    async execute(client, interaction, args, Discord) {

        const arg = interaction.options.getString('reason')
        
        const afkreason = arg || 'No reason';

        db.findOne({ Guild: interaction.guildId, Member: interaction.member.id }, async (err, data) => {
            if (data) {
            data.delete()

            return interaction.followUp({ content: `<@${interaction.member.id}> welcome back, i removed your afk!` })
            } else {
                Data = new db({
                    Guild: interaction.guild.id,
                    Member: interaction.member.id,
                    Content: afkreason,
                    TimeAgo: Date.now()
                })
                Data.save()

                interaction.followUp({ content: `<@${interaction.member.id}> setted your status to afk: ${afkreason}` })
            }
        })
        
        
 }
}