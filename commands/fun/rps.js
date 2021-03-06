module.exports = {
    name: "rps",
    aliases: ['tkm'],
    cooldown: 5,
    description: "Rock, paper, scissors..!",
    category: ['Fun'],
    arguments: `<none>`,
    async execute(client, message, args, cmd, Discord) {



        const BotChoice = ["โ๏ธ", "๐ค", "โ"][Math.floor(Math.random() * ["โ๏ธ", "๐ค", "โ"].length)]

        const MessageEmb = new Discord.MessageEmbed().setDescription("Choose in the buttons `Scissors` `Stone` `Paper`.")

        const row = new Discord.MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("โ๏ธ")
                .setCustomId("scissors"),
            new MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("โฐ๏ธ")
                .setCustomId("stone"),
            new MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("๐งป")
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

                if (BotChoice === "โ๏ธ") result = "It is a tie!"
                if (BotChoice === "๐ค") result = "You have lost!"
                if (BotChoice === "โ") result = "You have won!"

                const emb = new Discord.MessageEmbed()
                    .addField(message.author.username, "โ๏ธ", true)
                    .addField("VS", "โก", true)
                    .addField(client.user.username, BotChoice, true)
                    .addField("Result:", result)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()

                await msg.edit({ embeds: [emb], components: [row] })
            }

            if (collected.customId === "stone") {
                let result

                if (BotChoice === "โ๏ธ") result = "You have won!"
                if (BotChoice === "๐ค") result = "It is a tie!"
                if (BotChoice === "โ") result = "You have lost!"

                const emb = new Discord.MessageEmbed()
                    .addField(message.author.username, "๐ค", true)
                    .addField("VS", "โก", true)
                    .addField(client.user.username, BotChoice, true)
                    .addField("Result:", result)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()

                await msg.edit({ embeds: [emb], components: [row] })
            }

            if (collected.customId === "paper") {
                let result

                if (BotChoice === "โ๏ธ") result = "You have won!"
                if (BotChoice === "๐ค") result = "You have lost!"
                if (BotChoice === "โ") result = "It is a tie!"

                const emb = new Discord.MessageEmbed()
                    .addField(message.author.username, "โ", true)
                    .addField("VS", "โก", true)
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