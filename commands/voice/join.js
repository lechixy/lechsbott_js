const djv = require('@discordjs/voice')
const { GuildMember } = require('discord.js')

module.exports = {
    name: 'join',
    aliases: ['jointo', 'setdeaf', 'setundeaf'],
    description: 'stop the bot and leave the channel',
    async execute(client, message, args, cmd, Discord) {
        if(cmd === 'join'){
            const voiceChannel = message.member.voice.channel;
            const tick = client.emojis.cache.get("846016813817266177");
            const cross = client.emojis.cache.get("846030611486474280");
            if (!voiceChannel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) return message.channel.send(`${cross} Don't have correct permissions try to add \`Connect\` to <@${message.author.id}> on voice channel permissions!`);

            if(voiceChannel) {

                if (message.member instanceof GuildMember && message.member.voice.channel) {
                    djv.joinVoiceChannel({
                        channelId: voiceChannel.id,
                        guildId: voiceChannel.guild.id,
                        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                    })
                }

                message.channel.send(`${tick} **Succesfully connected to \`${voiceChannel.name}\`**`)
                

            }
        }
        else if(cmd === 'jointo'){
            let wanted = client.channels.cache.get(args[0]);
            if(!args[0]) return message.channel.send('The channel does not exist!');

            const voiceChannel = wanted;
            if(!voiceChannel) return message.channel.send("There is any voice channel that id!");
            const tick = client.emojis.cache.get("846016813817266177");
            const cross = client.emojis.cache.get("846030611486474280");
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) return message.channel.send(`${cross} Don't have correct permissions try to add \`Connect\` to <@${message.author.id}> on voice channel permissions!`);

            if(voiceChannel){
                try {
                    voiceChannel.join()
                    message.channel.send(`${tick} **Succesfully connected to \`${voiceChannel.name}\`**`)
                } catch(err){
                    message.channel.send(`${cross} Don't have correct permissions try to add \`Connect\` to <@${message.author.id}> on voice channel permissions!\n${err}`);
                }
            }
            else if(voiceChannel.id === client.user.voice.channel.id){
                return message.channel.send(`${cross} **Already joined to \`${voiceChannel.nam}\`**`)
            }    
        }
        else if(cmd === 'setdeaf'){
            const voiceChannel = message.member.voice.channel;
            if (message.member.voice && message.guild.voice && message.member.voice.channelID === message.guild.voice.channelID) {
                voiceChannel.join().then(connection => {
                    connection.voice.setSelfDeaf(true);
                });
                let voicecsucembed = new Discord.MessageEmbed()
                .setDescription(`Successfully setted **lechsbott** selfdeaf mode to **true**`)
                return message.channel.send({ embeds: [voicecsucembed] })
            }
            else {
                let voicec1embed = new Discord.MessageEmbed()
                .setDescription(`You cannot use this command because **you and lechsbott** aren't at same voice channel!`)
                return message.channel.send({ embeds: [voicec1embed] })
            }
        }
        else if(cmd === 'setundeaf'){
            const voiceChannel = message.member.voice.channel;
            if (message.member.voice && message.guild.voice && message.member.voice.channelID === message.guild.voice.channelID) {
                voiceChannel.join().then(connection => {
                    connection.voice.setSelfDeaf(false);
                });
                let voicecsucembed = new Discord.MessageEmbed()
                .setDescription(`Successfully setted **lechsbott** selfdeaf mode to **false**`)
                return message.channel.send({ embeds: [voicecsucembed] })
            }
            else{
                let voicec1embed = new Discord.MessageEmbed()
                .setDescription(`You cannot use this command because **you and lechsbott** aren't at same voice channel!`)
                return message.channel.send({ embeds: [voicec1embed] })
            } 
        }
    }
}