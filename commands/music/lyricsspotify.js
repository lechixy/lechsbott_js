module.exports = {
    name: 'spotifylyrics',
    aliases: ['spolyrics', 'listeninglyrics', 'statuslyrics', 'songlyrics', 'lyrcs','listenlyrics'],
    cooldown: 0,
    description: 'Spotify lyrics finder command!',
    async execute(client, message, args, cmd, Discord) {
        const lyricsFinder = require('lyrics-finder')

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
            return message.channel.send(`This user isn't listening \`Spotify!\``)
        } else {
            let name = status.details;

        const title = name

        let loading = new Discord.MessageEmbed()
        .setDescription(`<a:loading:846030612254687253> **Searching for lyrics of ${name}**...`)
        const m = await message.channel.send(loading);

        let lyrics = await lyricsFinder(title, "");

        if (!lyrics) {
            let errorembed = new Discord.MessageEmbed()
            .setDescription(`${cross} **Lyrics is not found!**`)
            m.edit(errorembed)
        } else {
            let lyricsEmbed = new Discord.MessageEmbed()
            .setTitle(`Lyrics of ${name}`)
            .setDescription(lyrics)
            .setTimestamp()

            if (lyricsEmbed.description.length >= 2048)
            lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
            return m.edit(lyricsEmbed)
        }
    }
    }
}
