module.exports = {
    name: "usersearch",
    aliases: ['finduser', 'searchuser'],
    description: "Search for people's 'username, tag, ID, discriminator (the 4 number at the end of the username), #discriminator and nickname' in this server!",
    async execute(client, message, args, cmd, Discord) {


        let noperm = new Discord.MessageEmbed()
            .setDescription(`You don't have permissions to run this command.`)
            .setColor("#b3666c")

        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ embeds: [noperm] })

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
            .setDescription(array.join("\n") || "❌ No Results - Can't Find Any User!")
            .setFooter(`${array.length} result(s)`)
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/attachments/870637449158742057/874944240290005042/bloodbros-search.gif")
        message.channel.send({ embeds: [embed] })
    },
};
