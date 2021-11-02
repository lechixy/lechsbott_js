module.exports = {
    name: "usersearch",
    aliases: ['finduser', 'searchuser'],
    description: "Search members with many in guild",
    category: ['Moderation'],
    arguments: `<username | tag | id | nickname>`,
    userPerms: ['MANAGE_MESSAGES'],
    clientPerms: ['MANAGE_MESSAGES'],
    async execute(client, message, args, cmd, Discord) {

        const user = args.join(" ")
        if (!user) return message.channel.send({ content: "Please specify a user to find." });

        const array = [];

        message.guild.members.cache.forEach((use) => {
            if (use.user.username.toUpperCase() == user.toUpperCase() || use.user.id === user.toUpperCase() || use.user.tag.toUpperCase() == user.toUpperCase() || use.displayName.toUpperCase() == user.toUpperCase() || use.user.discriminator == user.toUpperCase() || `#${use.user.discriminator}` == user.toUpperCase()) {
                array.push(`● ${use.user}\n> __Tag:__ ${use.user.tag}\n> __ID:__ ${use.user.id}\n> __Nickname:__ ${use.displayName == use.user.username ? "No Nickname" : use.displayName}\n`);
            }
        });

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Searching for ${user} in ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setDescription(array.join("\n") || "No Results")
            .setFooter(`${array.length} result(s)`)
        message.channel.send({ embeds: [embed] })
    },
};
