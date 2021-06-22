module.exports = (Discord, client, System) => {
    console.log('Lechsbott now online!')
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);

    client.on('message', message => {
        if (message.mentions.has(client.user.id)) {
            if (message.author.bot) return false;
            if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

            let mentionembed = new Discord.MessageEmbed()
            .setAuthor(`lechsbott`, `${client.user.displayAvatarURL()}`)
            .setTitle(`Hey ${message.author.username}`)
            .setDescription(`If you need anything about **lechsbott** just type \`l!help\` to guild chat!`)
            .setTimestamp()
            message.channel.send(mentionembed)
        };
    })

    client.on('guildCreate', async guild => {
        await Tags.create({guild_id: guild.id})

        let joinedembed = new Discord.MessageEmbed()
        .setAuthor(`lechsbott`, `${client.user.displayAvatarURL()}`)
        .setTitle(`Hey <@${guild.owner.id}>`)
        .setDescription(`Joined to **${guild.name}**!\nIf you need anything about **lechsbott** just type \`l!help\` to guild chat!`)
        .setTimestamp()
        guild.owner.send(joinedembed)
    })
    client.on('guildDelete', async guild => {
        await Tags.destroy({where: {guild_id: guild.id}})

        let leftedembed = new Discord.MessageEmbed()
        .setAuthor(`lechsbott`, `${client.user.displayAvatarURL()}`)
        .setTitle(`Hey <@${guild.owner.id}>`)
        .setDescription(`Leaved from **${guild.name}**!\nIf you want to invite **lechsbott** again use [\`this link\`](https://discord.com/api/oauth2/authorize?client_id=753906874729889853&permissions=8&scope=bot) to reinvite!`)
        .setTimestamp()
        guild.owner.send(leftedembed)
    })
}

