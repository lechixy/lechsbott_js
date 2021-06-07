module.exports = {
    name: "lab",
    cooldown: 0,
    description: "welcome to the lab",
    async execute(client, message, args, cmd, Discord) {
        // if (!args.length) return message.channel.send('You need to send the second argument!')

        if(message.content.includes('open.spotify.com/track/'||'https://open.spotify.com/track/')){
                const spotifylink = `${args[0]}`

                message.channel.send(spotifylink)
        }
    }
}