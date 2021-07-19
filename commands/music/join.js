module.exports = {
    name: 'join',
    aliases: ['jointo', 'setdeaf', 'setundeaf'],
    description: 'stop the bot and leave the channel',
    async execute(client, message, args, cmd, Discord) {
        if(cmd === 'join'){
            const voiceChannel = message.member.voice.channel;

            if (!voiceChannel) return message.channel.send(`You need to be in a channel to execute this command!`);
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) return message.channel.send(`Don't have correct permissions try to add \`Connect\` to <@${message.author.id}> on voice channel permissions!`);

            if(voiceChannel) { 
                if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**Succesfully connected to \`${message.member.voice.channel.name}\`**`)
                message.channel.send(embed);
                await voiceChannel.join()
            } else {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**Already joined to \`${message.member.voice.channel.name}\`**`)
                message.channel.send(embed);
            }}
        }
        else if(cmd === 'jointo'){
            let wanted = client.channels.cache.get(args[0]);
            if(!args[0]) return message.channel.send('The channel does not exist!');

            const voiceChannel = wanted;
            if(!voiceChannel) return message.channel.send("There is any voice channel that id!");

            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) return message.channel.send(`Don't have correct permissions try to add \`Connect\` to <@${message.author.id}> on voice channel permissions!`);

            if(voiceChannel){
                try {
                    voiceChannel.join()
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`**Succesfully connected to \`${voiceChannel.name}\`**`)
                    message.channel.send(embed);
                } catch(err){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`**Don't have correct permissions try to add \`Connect\` to <@${message.author.id}> on voice channel permissions!**`)
                    message.channel.send(embed);
                }
            }
            else if(voiceChannel.id === client.user.voice.channel.id){
                const embed = new Discord.MessageEmbed()
                .setDescription(`**Already joined to \`${voiceChannel.nam}\`**`)
                return message.channel.send(embed)
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
                return message.channel.send(voicecsucembed)
            }
            else {
                let voicec1embed = new Discord.MessageEmbed()
                .setDescription(`You cannot use this command because **you and lechsbott** aren't at same voice channel!`)
                return message.channel.send(voicec1embed)
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
                return message.channel.send(voicecsucembed)
            }
            else{
                let voicec1embed = new Discord.MessageEmbed()
                .setDescription(`You cannot use this command because **you and lechsbott** aren't at same voice channel!`)
                return message.channel.send(voicec1embed)
            } 
        }
    }
}