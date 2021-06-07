module.exports = {
    name: "zoom",
    aliases: ["büyüt", "zoomin", "yakınlaştır"],
    cooldown: 0,
    description: "Returns to user with zoomed",
    async execute(client, message, args, cmd, Discord) {
        let work = 'true';

        if(work === 'true'){
            return message.channel.send('Command was disabled!')
        }

        if (!args.length) return message.channel.send('You need to send the second argument!')

        let wantedid = client.emojis.cache.get(args[0])
        let wantedurl = `https://cdn.discordapp.com/emojis/${wantedid}`

        let emojiresult = new Discord.MessageEmbed()
        .setColor('FF0000')
        .setImage(wantedurl)
        .setTimestamp()
        message.channel.send(emojiresult)

    }
}