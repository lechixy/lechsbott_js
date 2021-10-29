module.exports = {
    name: 'pull',
    description: 'Pulls member from other channel to your channel',
    category: ['Moderation'],
    arguments: `<@User | UserID>`,
    userPerms: ['MOVE_MEMBERS'],
    clientPerms: ['MOVE_MEMBERS'],
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;

        let member
        if (message.mentions.members.first()) {
            member = message.mentions.members.first()
        } else if (args[0]) {
            member = await message.guild.members.cache.get(args[0])
        }

        if(!member){
            const memberembed = new Discord.MessageEmbed()
            .setAuthor(`Please mention a member to pull!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [memberembed] })
        }
        if(!member.voice.channel){
            const memberembed = new Discord.MessageEmbed()
            .setAuthor(`This user is not in a voice channel!`, member.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [memberembed] })
        }
        if(!message.member.voice.channel){
            const memberembed = new Discord.MessageEmbed()
            .setAuthor(`You need to be in a voice channel!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [memberembed] })
        }

        try {
            member.voice.setChannel(message.member.voice.channel)

            let successembed = new Discord.MessageEmbed()
            .setDescription(`<@${member.id}> **is pulled to** <#${message.member.voice.channel.id}>`)
            return message.channel.send({ embeds: [successembed] })

        } catch(err) {
            console.log(err);
            let embed = new Discord.MessageEmbed()
            .setDescription(`**There is an error while pulling member**`)
            return message.channel.send({ embeds: [embed] })
        }
    }
}