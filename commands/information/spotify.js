module.exports = {
    name: "spotify",
    description: "Are you listening?",
    aliases: ["listening"],
    cooldown: 3,
    category: ['Information'],
    async execute(client, message, args, cmd, Discord) {

        const moment = require('moment')

        let user
        if (message.mentions.members.first()) {
            user = message.mentions.members.first()
        } else if (args[0]) {
            user = await message.guild.members.cache.get(args[0])
        } else {
            user = message.member
        }
        
        if (!user.presence?.activities) {
            let tui = new Discord.MessageEmbed()
                .setAuthor(`${user.user.username} is not online!`, `${user.user.displayAvatarURL()}`)
                .setDescription(`We can't show you an offline member activities`)
            return message.channel.send({ embeds: [tui] })
        }

        let status;
        if (user.presence.activities.length === 1) status = user.presence.activities[0];
        else if (user.presence.activities.length > 1) status = user.presence.activities[1];

        if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
            if (message.author.id === user.id) {
                let tui = new Discord.MessageEmbed()
                .setColor('03fc62')
                .setAuthor(`You are not listening Spotify!`, `${user.user.displayAvatarURL()}`)
                .setDescription(`Can you check you has an activity?`)
                return message.channel.send({ embeds: [tui] })
            } else {
                let tui = new Discord.MessageEmbed()
                    .setColor('03fc62')
                    .setAuthor(`${user.user.username} is not listening Spotify!`, `${user.user.displayAvatarURL()}`)
                    .setDescription(`Can you check this user has an activity?`)
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
                    { name: 'Song', value: name, inline: true },
                    { name: 'Artist', value: artist, inline: true },
                    { name: 'Duration', value: `${timeminutes}:${timeseconds}`, inline: true },
                    { name: 'Listen on Spotify!', value: `[\`${artist} - ${name}\`](${url})`, inline: true })
                .setTimestamp()
            return message.channel.send({ embeds: [spotifyInfo] });
        }
    }
}