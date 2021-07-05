module.exports = {
    name: 'game',
    description: 'What\'s playing user?',
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

        if(user.presence.activities.length === 0 || status.type !== "PLAYING") {
            return message.channel.send(`This user isn't playing a \`game!\``)
        }

        if(status.type === "PLAYING") {
            // let image = `${status.assets.largeImage.url}`,
            let name = status.details,
                artist = status.state;

            let playinginfo = new Discord.MessageEmbed()
            .setAuthor(`${user.username}'s Currently Game Status`, `${user.displayAvatarURL()}`)
            // .setThumbnail(image)
            .addFields(
                {name: 'Game Name', value: name, inline: true},
                {name: 'Author', value: artist, inline: true})
            .setTimestamp()
            return message.channel.send(playinginfo);
        }
    }
}