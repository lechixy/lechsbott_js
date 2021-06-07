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
        .setTitle('Avatar')
        .setImage(avatar)
        .setColor("0xff0000")
        .setFooter('lechsbot')
        .setTimestamp()
        
        message.channel.send(avatarEmbed)
    }
}

// module.exports = {
//     name: "avatar",
//     description: "Brodcast someone's avatar",

//     async run (client, message, args) {

//         let member = message.mentions.users.first() || message.author

//         let avatar = member.displayAvatarURL({size: 1024})


//         const embed = new Discord.MessageEmbed()
//         .setTitle(`${member.username}'s avatar`)
//         .setImage(avatar)
//         .setColor("RANDOM")

//         message.channel.send(embed);
//     }
// }