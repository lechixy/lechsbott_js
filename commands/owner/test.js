const { lechsPlayer } = require('../music/utils/lechsPlayer')
const { confirmation } = require('../util/lechs_confirm')

module.exports = {
    name: 'test',
    ownerOnly: true,
    category: ['Owner'],
    async execute(client, message, args, cmd, Discord) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`About command`, client.user.displayAvatarURL({dynamic: true}))
        .setTitle('play')
        .setDescription(`Plays music to your voice channel`)
        .addField(`Aliases`, `\`\`\`p\`\`\``)
        .addField(`Arguments`, `\`\`\`<spotify/youtube/soundcloud link>\`\`\``)
        .setTimestamp()
        message.channel.send({ embeds: [embed] });

        // const cls = new lechsPlayer(message.guild.id)
        // console.log(cls.player().pause())

        // const Voice = require('@discordjs/voice')
        // const voice_channel = message.member.voice.channel

        // let player = Voice.getVoiceConnection(message.guild.id)
        
        // try {
        //     player._state.subscription.player.unpause()
        // } catch (err) {
        //     console.log(err)
        // }

    }
}