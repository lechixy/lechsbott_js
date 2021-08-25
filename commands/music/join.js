const { PREFIX } = require('../util/lechsbottUtil')
const Voice = require('@discordjs/voice');

module.exports = {
    name: 'join',
    aliases: ['jointo'],
    description: '',
    async execute(client, message, args, cmd, Discord) {

        if (cmd === 'join') {

            const voiceChannel = message.member.voice.channel

            if (!voiceChannel) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`You need to be on a voice channel for lechsbott to join!`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Want **lechsbott** to join a specified voice channel?`)
                    .addField('Just use', `${PREFIX}jointo <channel | channel id>`)
                return message.channel.send({ embeds: [embed] });
            } else {

                let joiner = Voice.joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });

                try {
                    await Voice.entersState(
                        joiner,
                        Voice.VoiceConnectionStatus.Ready,
                        20000
                    );
                } catch {
                    const embed = new Discord.MessageEmbed().setDescription(
                        `**Failed to join voice channel within 20 seconds, please try again later!**`
                    );
                    message.channel.send({ embeds: [embed] });
                    return;
                }

                const embed = new Discord.MessageEmbed()
                    .setDescription(`**lechsbott** successfully joined to <#${voiceChannel.id}>`)
                message.channel.send({ embeds: [embed] });
            }
        } else if (cmd === 'jointo') {

            const c = message.guild.channels.cache.find(ch => ch.name.includes(args.join(' ')) && ch.type.includes('GUILD_VOICE'))

            if(!c){
                const embed = new Discord.MessageEmbed()
                .setDescription(`I couldn't find **a voice channel** within **${args.join(' ')}** name,\nplease pay attention to channel name and uppercase, lowercase letters!`)
                return message.channel.send({ embeds: [embed] });
            }

            let joiner = Voice.joinVoiceChannel({
                channelId: c.id,
                guildId: c.guild.id,
                adapterCreator: c.guild.voiceAdapterCreator,
            });

            try {
                await Voice.entersState(
                    joiner,
                    Voice.VoiceConnectionStatus.Ready,
                    20000
                );
            } catch {
                const embed = new Discord.MessageEmbed().setDescription(
                    `**Failed to join voice channel within 20 seconds, please try again later!**`
                );
                message.channel.send({ embeds: [embed] });
                return;
            }

            const embed = new Discord.MessageEmbed()
            .setDescription(`**lechsbott** successfully joined to <#${c.id}>`)
            message.channel.send({ embeds: [embed] });
            
        }
    }
}