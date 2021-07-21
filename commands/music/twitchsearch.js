module.exports = {
    name: "twitchsearch",
    aliases: ["twsearch", "twsrch"],
    description: "idek",
    async execute(client, message, args, cmd, Discord){
        let msglink = args.join('%20') // we're joining the args using %20, so if the args are Hello World it would be Hello%20World
        let msg = args.join(' ') // we're joining the args using a space. If you don't have the space Hello World would be HelloWorld
        let user = message.author;
        if(!args[0]) {
            let argsembed = new Discord.MessageEmbed()
            .setColor('6034b2')
            .setAuthor(`Please type a term to search!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(argsembed)
        }

        let embed = new Discord.MessageEmbed() // making the embed
        .setColor('6034b2')
        .setAuthor(`Twitch search results for ${msg}`, user.displayAvatarURL({dynamic: true}), `https://www.twitch.tv/search?term=${msglink}`)
        .setDescription(`[${msg}](https://www.twitch.tv/search?term=${msglink})`) // this is how you make a hyperlink ONLY IN DESCRIPTIONS [message](link), the ${} is used to call a variable in a string. You can only use it when using backticks.
        .setTimestamp()
        message.channel.send(embed) // sending the embed
    }
}