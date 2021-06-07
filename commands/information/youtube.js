module.exports = {
    name: 'youtube',
    aliases: 'yt',
    description: 'A youtube command!',
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

        if(user.presence.activities.length === 0 || status.name !=="YouTube" && status.type !== "PLAYING") {
            return message.channel.send(`This user isn't watching \`YouTube!\``)
        }

        if(status.type === "PLAYING" && status.name === "YouTube") {
            let image = `https://cdn.discordapp.com/app-assets/463097721130188830/513734690272968717.png`,
                youtuber = status.state,
                url = `https://youtube.com/${youtuber}`,
                name = status.details;

            let youtubeinfo = new Discord.MessageEmbed()
            .setAuthor(`${user.username}'s Currently YouTube Status`, `${user.displayAvatarURL()}`)
            .setThumbnail(image)
            .addFields(
                {name: 'Video Title', value: name, inline: true},
                {name: 'Channel', value: youtuber, inline: true},
                {name: 'Status', value: '<:live:850474685954523137> WATCHING', inline: true},
                {name: 'Watch now on Youtube!', value: `[\`${youtuber}\`](${url})`, inline: true })
            .setTimestamp()
            return message.channel.send(youtubeinfo);
        }
    }
}