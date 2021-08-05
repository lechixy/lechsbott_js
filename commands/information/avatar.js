module.exports = {
    name: 'avatar',
    description: "Broadcast someone's avatar!",
    aliases: ["pp", "profilresmi"],
    cooldown: 0,
    async execute(client, message, args, cmd, Discord){
        
        let member = message.mentions.users.first() || message.author
        let member1 = member.displayAvatarURL()

        let avatar = member.displayAvatarURL({dynamic: true ,size: 1024})
        
        let avatarEmbed = new Discord.MessageEmbed()
        .setAuthor(`${member.username}`, member1)
        .setImage(avatar)
        .setTimestamp()
        
        message.channel.send({ embeds: [avatarEmbed] })
    }
}