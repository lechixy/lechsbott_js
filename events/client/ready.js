module.exports = (Discord, client, Guilds) => {
    console.clear()
    console.log('Lechsbott now online!')
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);

    client.on('message', message => {
        if (message.mentions.has(client.user.id)) return
        if (message.author.bot) return
        if (message.content.includes("@here") || message.content.includes("@everyone")) return
    })

    client.on('guildCreate', async guild => {
        await Guilds.create({guild_id: guild.id})

        let joinedembed = new Discord.MessageEmbed()
        .setAuthor(`lechsbott`, `${client.user.displayAvatarURL()}`)
        .setTitle(`Hey <@${guild.owner.id}>`)
        .setDescription(`Joined to **${guild.name}**!\nIf you need anything about **lechsbott** just type \`l!help\` to guild chat!`)
        .setTimestamp()
        guild.owner.send(joinedembed)
    })
    client.on('guildDelete', async guild => {
        await Guilds.destroy({where: {guild_id: guild.id}})

        let leftedembed = new Discord.MessageEmbed()
        .setAuthor(`lechsbott`, `${client.user.displayAvatarURL()}`)
        .setTitle(`Hey <@${guild.owner.id}>`)
        .setDescription(`Leaved from **${guild.name}**!\nIf you want to invite **lechsbott** again use [\`this link\`](https://discord.com/api/oauth2/authorize?client_id=753906874729889853&permissions=8&scope=bot) to reinvite!`)
        .setTimestamp()
        guild.owner.send(leftedembed)
    })
    client.on('interactionCreate', async (interaction) => {
        if(interaction.isCommand()){
            await interaction.defer({ ephemeral: true }).catch(() => {});

            const cmd = client.slashCommands.get(interaction.commandName);
            if(!cmd){
                return interaction.followUp({ content: 'An error has occured' })
            }

            const args = [];
            interaction.options.array().map((x) => {
                args.push(x.value)
            })

            cmd.run(client, interaction, args)




        }
    })
}

