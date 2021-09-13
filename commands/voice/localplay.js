module.exports = {
    name: 'localplay',
    // aliases: ['jointo', 'setdeaf', 'setundeaf'],
    description: 'localplayer',
    async execute(client, message, args, cmd, Discord){
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send(`${cross} You need to be in a channel to execute this command!`);

         voice_channel.join().then(connection => {
             connection.play("../../localplayer/blowyourmind.mp3");
         })
        let successembed = new Discord.MessageEmbed()
        .setDescription(`Now playing from local blowyourmind.mp3`)
        message.channel.send({ embeds: [successembed] })
        // const broadcast = client.voice.createBroadcast();
        // broadcast.play('../../localplayer/blowyourmind.mp3');
        // Play "music.mp3" in all voice connections that the client is in
        // for (const connection of client.voice.connections.values()) {
        // connection.play(broadcast);
        // }
    }
}