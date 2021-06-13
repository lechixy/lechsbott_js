module.exports = {
    name: 'twitch',
    description: '',
    cooldown: 0,
    async execute(client, message, args, cmd, Discord) {
        let user;
        if(message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        let status;
        if(user.presence.activities.length === 1) status = user.presence.activities[0];
        else if(user.presence.activities.length > 1) status = user.presence.activities[1];

        if(user.presence.activities.length === 0 || status.name !=="Twitch" && status.type !== "PLAYING") {
            return message.channel.send(`This user isn't watching \`Twitch!\``)
        }

        if(status.type === "PLAYING" && status.name === "Twitch") {
            let image = `https://cdn.discordapp.com/app-assets/802958789555781663/802961389836697640.png`,
                streamer = status.state,
                url = `https://twitch.tv/${streamer}`,
                name = status.details;

            let twitchinfo = new Discord.MessageEmbed()
            .setColor('ae00ff')
            .setAuthor(`${user.username}'s Currently Twitch Status`, `${user.displayAvatarURL()}`)
            .setThumbnail(image)
            .addFields(
                {name: 'Stream Title', value: name, inline: true},
                {name: 'Channel', value: streamer, inline: true},
                {name: 'Status', value: '<:live:850474685954523137> LIVE', inline: true},
                {name: 'Watch now on Twitch!', value: `[\`${streamer}\`](${url})`, inline: true })
            .setTimestamp()
            return message.channel.send(twitchinfo);
        }
    }
}