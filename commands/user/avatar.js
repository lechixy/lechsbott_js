module.exports = {
    name: 'avatar',
    description: "Broadcast someone's avatar!",
    aliases: ["pp", "av"],
    cooldown: 0,
    category: ['User'],
    async execute(client, message, args, cmd, Discord){
        
        let user
        if (message.mentions.members.first()) {
            user = message.mentions.members.first()
        } else if (args[0]) {
            user = await message.guild.members.cache.get(args[0])
        } else {
            user = message.member
        }

        if (!user) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Oops, we can't found this user in server`)
                .setDescription(`Please mention a member or give an user id for check avatar!`)
                .addField(`Usage`, `${PREFIX}${cmd} **<@User | Id>**`)
            return message.channel.send({ embeds: [embed] });
        }

        let avatar = user.displayAvatarURL({dynamic: true ,size: 1024})
        
        let avatarEmbed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
        .setImage(avatar)
        message.channel.send({ embeds: [avatarEmbed] })
    }
}