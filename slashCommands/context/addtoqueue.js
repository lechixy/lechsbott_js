const { handleResource, songFinder } = require('../../commands/music/utils')
const { iroleColor } = require('../../commands/util/lechsbottFunctions')
const Voice = require('@discordjs/voice')

module.exports = {
    name: 'Play with lechsbott',
    type: 'MESSAGE',
    async execute(client, interaction, Discord) {

        const voice_channel = interaction.member.voice.channel;

        if (!voice_channel) {
            let voiceembed = new Discord.MessageEmbed()
                .setColor(iroleColor(interaction))
                .setAuthor(
                    `You need to be in a voice channel for play a music!`,
                    interaction.user.displayAvatarURL({ dynamic: true })
                )
            return interaction.followUp({ embeds: [voiceembed] });
        }

        const queue = client.queue
        const server_queue = queue.get(interaction.guild.id)

        if (server_queue) {

            if (voice_channel.channel.id !== server_queue.voice_channel.id) {
                const embed = new Discord.MessageEmbed()
                    .setColor(iroleColor(interaction))
                    .setAuthor(`There is currently playing a song on another voice channel`, interaction.user.displayAvatarURL({ dynamic: true }))
                return interaction.followUp({ embeds: [embed] });
            }
        }

        const targetmessage = interaction.options.getMessage('message')

        if(targetmessage.content === ''){
            return interaction.followUp({ content: `That message is not contains an message, please select another one!` })
        }

        let player = Voice.joinVoiceChannel({
            channelId: voice_channel.id,
            guildId: voice_channel.guild.id,
            adapterCreator: voice_channel.guild.voiceAdapterCreator,
            selfDeaf: true,
        });

        await songFinder(interaction, targetmessage.content, client, player, voice_channel)



    }
}