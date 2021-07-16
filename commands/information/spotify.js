module.exports = {
    name: "spotify",
    description: "Track your spotify data",
    aliases: ["spo"],
    cooldown: 0,
    async execute(client, message, args, cmd, Discord){

        const moment = require('moment')

        let user;
        if(message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        let status;
        if(user.presence.activities.length === 1) status = user.presence.activities[0];
        else if(user.presence.activities.length > 1) status = user.presence.activities[1];

        if(user.presence.activities.length === 0 || status.name !=="Spotify" && status.type !== "LISTENING") {
            let tui = new Discord.MessageEmbed()
            .setColor('03fc62')
            .setAuthor(`This user isn't watching Spotify!`, `${user.displayAvatarURL()}`)
            return message.channel.send(tui)
        }

        if(status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
            let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
                url = 'https://open.spotify.com/track/${status.syncID}',
                name = status.details,
                artist = status.state,
                timeStart = status.timestamps.start,
                timeEnd = status.timestamps.end,
                timeduration = (timeEnd - timeStart);

            let timeseconds = moment.duration(timeduration).seconds()
            let timeminutes = moment.duration(timeduration).minutes()


            let spotifyInfo = new Discord.MessageEmbed()
            .setColor('03fc62')
            .setAuthor(`${user.username}'s Currently Spotify Status`, `${user.displayAvatarURL()}`)
            .setThumbnail(image)
            .addFields(
                {name: 'Song Name', value: name, inline: true},
                {name: 'Artist', value: artist, inline: true},
                {name: 'Duration', value: `${timeminutes}:${timeseconds}`, inline: true},
                {name: 'Listen now on Spotify!', value: `[\`${artist} - ${name}\`](${url})`, inline: true },
                {name: `\u200B`, value: `For more about social status embeds **l!help** at information label`})
            .setTimestamp()
            return message.channel.send(spotifyInfo);
        }
    }
}