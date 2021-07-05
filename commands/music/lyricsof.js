module.exports = {
    name: 'lyricsof',
    aliases: ['sözler'],
    cooldown: 0,
    description: 'For lyrics',
    async execute(client, message, args, cmd, Discord){
        const lyricsFinder = require('lyrics-finder')
        const cross = client.emojis.cache.get("846030611486474280");

        const title = args.join(" ")

        let loading = new Discord.MessageEmbed()
        .setDescription(`**<a:loading:846030612254687253> Searching for lyrics of ${title}**...`)
        .setColor("ffffff")
        const m = await message.channel.send(loading);

        lyrics = await lyricsFinder(title, "");

        if (!lyrics) {
            let errorembed = new Discord.MessageEmbed()
            .setDescription(`${cross} **Lyrics is not found!**`)
            .setColor("ffffff")
            m.edit(errorembed)
        } else {
            let lyricsEmbed = new Discord.MessageEmbed()
            .setTitle(`Lyrics`)
            .setDescription(lyrics)
            .setColor("ffffff")
            .setTimestamp()

            if (lyricsEmbed.description.length >= 2048)
            lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
            return m.edit(lyricsEmbed)
        }

        
    }
}