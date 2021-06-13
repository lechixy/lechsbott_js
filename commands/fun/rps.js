// const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "rps",
    aliases: ['tkm'],
    cooldown: 5,
    description: "A rps game command!",
    async execute(client, message, args, cmd, Discord) {
        const embed = new Discord.MessageEmbed()
            .setColor("0xff0000")
            .setAuthor("Add a reaction to one of these emojis to play the game!")

        const m = await message.channel.send(embed);

        await m.react("🗻")
        await m.react("📰")
        await m.react("✂")

        const filter = (reaction, user) => {
            return ['🗻', '📰', '✂'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '📰', '✂']
        const me = choices[Math.floor(Math.random() * choices.length)]
        m.awaitReactions(filter, {max: 1, time: 60000, errors: ["time"]}).then(
            async(collected) => {
                const reaction = collected.first()
                let result = new Discord.MessageEmbed()
                .setTitle("Result!")
                .addField("Your choice", reaction.emoji.name, true)
                .addField("Bot's choice", me, true)
                await m.edit(result);
                if((reaction.emoji.name === "📰" && me === "📰") ||
                  (reaction.emoji.name === "🗻" && me === "🗻") ||
                  (reaction.emoji.name === "✂" && me === "✂"))
                {
                    message.reply('Tie!')

                } else if ((reaction.emoji.name === "🗻" && me === "📰") ||
                           (reaction.emoji.name === "✂" && me === "📰") ||
                           (reaction.emoji.name === "📰" && me === "🗻"))
                {
                    message.reply('You won!')
                } else {
                    message.reply('You lost!')
                }
                
            }
        )

        .catch(collected => {
            message.reply("Game aborted as you did not react to any of the emojis!")
        })
            
        
    }
}