module.exports = {
    name: 'join',
    aliases: 'jointo',
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
                if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
                message.channel.send(`${tick} **Succesfully connected to \`${message.member.voice.channel.name}\`**`)
                await voiceChannel.join()
            } else {
                message.channel.send(`${cross} **Already joined to \`${message.member.voice.channel.name}\`**`)
            }}
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
        
    }
}