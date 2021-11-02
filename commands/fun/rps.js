module.exports = {
    name: "rps",
    aliases: ['tkm'],
    cooldown: 5,
    description: "Rock, paper, scissors..!",
    category: ['Fun'],
    arguments: `<none>`,
    async execute(client, message, args, cmd, Discord) {



        const BotChoice = ["✌️", "🤜", "✋"][Math.floor(Math.random() * ["✌️", "🤜", "✋"].length)]

        const MessageEmb = new Discord.MessageEmbed().setDescription("Choose in the buttons `Scissors` `Stone` `Paper`.")

        const row = new Discord.MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("✂️")
                .setCustomId("scissors"),
            new MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("⛰️")
                .setCustomId("stone"),
            new MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("🧻")
                .setCustomId("paper"),
        )

        const msg = await message.reply({ embeds: [MessageEmb], components: [row] })

        const filter = (interaction) => interaction.user.id === message.author.id

        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: "BUTTON",
            time: 120000,
            max: 1
        })

        collector.on("collect", async (collected) => {

            if (collected.customId === "scissors") {
                let result

                if (BotChoice === "✌️") result = "It is a tie!"
                if (BotChoice === "🤜") result = "You have lost!"
                if (BotChoice === "✋") result = "You have won!"

                const emb = new Discord.MessageEmbed()
                    .addField(message.author.username, "✌️", true)
                    .addField("VS", "⚡", true)
                    .addField(client.user.username, BotChoice, true)
                    .addField("Result:", result)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()

                await msg.edit({ embeds: [emb], components: [row] })
            }

            if (collected.customId === "stone") {
                let result

                if (BotChoice === "✌️") result = "You have won!"
                if (BotChoice === "🤜") result = "It is a tie!"
                if (BotChoice === "✋") result = "You have lost!"

                const emb = new Discord.MessageEmbed()
                    .addField(message.author.username, "🤜", true)
                    .addField("VS", "⚡", true)
                    .addField(client.user.username, BotChoice, true)
                    .addField("Result:", result)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()

                await msg.edit({ embeds: [emb], components: [row] })
            }

            if (collected.customId === "paper") {
                let result

                if (BotChoice === "✌️") result = "You have won!"
                if (BotChoice === "🤜") result = "You have lost!"
                if (BotChoice === "✋") result = "It is a tie!"

                const emb = new Discord.MessageEmbed()
                    .addField(message.author.username, "✋", true)
                    .addField("VS", "⚡", true)
                    .addField(client.user.username, BotChoice, true)
                    .addField("Result:", result)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()

                await msg.edit({ embeds: [emb], components: [row] })
            }

            collected.deferUpdate()
        })
    }
}