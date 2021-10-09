module.exports = {
    name: "spotify",
    description: "Are you listening?",
    aliases: ["listening"],
    cooldown: 3,
    category: ['Information'],
    async execute(client, message, args, cmd, Discord) {

        const moment = require('moment')

        let user
        if(message.mentions.members.first()){
            user = message.mentions.members.first()
        } else {
            user = message.member
        }
        

        let status;
        if (user.presence.activities.length === 1) status = user.presence.activities[0];
        else if (user.presence.activities.length > 1) status = user.presence.activities[1];

        if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
            if (message.author.id === user.id) {
                let tui = new Discord.MessageEmbed()
                .setColor('03fc62')
                .setAuthor(`You are not listening Spotify!`, `${user.user.displayAvatarURL()}`)
                return message.channel.send({ embeds: [tui] })
            } else {
                let tui = new Discord.MessageEmbed()
                    .setColor('03fc62')
                    .setAuthor(`This user is not listening Spotify!`, `${user.user.displayAvatarURL()}`)
                return message.channel.send({ embeds: [tui] })
            }
        }

        if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
            let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
                url = `https://open.spotify.com/track/${status.syncId}`,
                name = status.details,
                artist = status.state,
                timeStart = status.timestamps.start,
                timeEnd = status.timestamps.end,
                timeduration = (timeEnd - timeStart);

            let timeseconds = moment.duration(timeduration).seconds()
            let timeminutes = moment.duration(timeduration).minutes()

            let spotifyInfo = new Discord.MessageEmbed()
                .setColor('03fc62')
                .setAuthor(`${user.user.tag}`, `${user.user.displayAvatarURL()}`)
                .setThumbnail(image)
                .addFields(
                    { name: 'Song Name', value: name, inline: true },
                    { name: 'Artist', value: artist, inline: true },
                    { name: 'Duration', value: `${timeminutes}:${timeseconds}`, inline: true },
                    { name: 'Listen on Spotify!', value: `[\`${artist} - ${name}\`](${url})`, inline: true })
                .setTimestamp()
            return message.channel.send({ embeds: [spotifyInfo] });
        }
    }
}