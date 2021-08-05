module.exports = {
    name: "netflix",
    description: "Track your spotify data",
    aliases: ["netf"],
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

        if(user.presence.activities.length === 0 || status.name !=="Netflix" && status.type !== "PLAYING") {
            let tui = new Discord.MessageEmbed()
            .setColor('E50914')
            .setAuthor(`This user isn't watching Netflix!`, `${user.displayAvatarURL()}`)
            return message.channel.send({ embeds: [tui] })
        }

        if(status !== null && status.type === "PLAYING" && status.name === "Netflix" && status.assets !== null) {
            let image = `https://cdn.discordapp.com/app-assets/499981204045430784/843132877884620860.png`,
                url = `https://www.netflix.com/`
                name = status.details,
                artist = status.state;
            
            let netflixinfo = new Discord.MessageEmbed()
            .setColor('E50914')
            .setAuthor(`${user.username}'s Netflix Status`, `${user.displayAvatarURL()}`)
            .setThumbnail(image)
            .addFields(
                {name: 'Now watching', value: name, inline: true},
                {name: 'Season/Episode', value: artist, inline: true},
                {name: 'Status', value: `<:live:850474685954523137> Watching`, inline: true},
                {name: 'Watch now on Netflix!', value: `[\`${name} on Netflix\`](${url})`, inline: true },
                {name: `\u200B`, value: `For more about social status embeds **l!help** at information label`})
            .setTimestamp()
            return message.channel.send({ embeds: [netflixinfo] });
        }
    }
}