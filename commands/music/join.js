module.exports = {
    name: 'join',
    cooldown: 0,
    description: 'stop the bot and leave the channel',
    async execute(client, message, args) {
        const voiceChannel = message.member.voice.channel;
        const tick = client.emojis.cache.get("846016813817266177");
        const cross = client.emojis.cache.get("846030611486474280");


        if(!voiceChannel) return message.channel.send("You need to be in a voice channel!");

        if(voiceChannel) { 
            if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
              await voiceChannel.join()
              message.channel.send(`${tick} **Succesfully connected to \`${message.member.voice.channel.name}\`**`)
        } else {
            message.channel.send(`${cross} **Already joined to \`${message.member.voice.channel.name}\`**`)
        }}
    }
}