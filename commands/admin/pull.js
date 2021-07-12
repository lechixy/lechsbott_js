module.exports = {
    name: 'pull',
    aliases: 'pullmember',
    description: 'pull a member',
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;

        if(!message.member.permissions.has("MANAGE_CHANNELS")){
            const permembed = new Discord.MessageEmbed()
            .setAuthor(`You doesn't have permission to Manage Channels`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(permembed)
        }

        const member = message.mentions.members.first();

        if(!member){
            const memberembed = new Discord.MessageEmbed()
            .setAuthor(`Please mention a member!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(memberembed)
        }
        if(!member.voice.channel){
            const memberembed = new Discord.MessageEmbed()
            .setAuthor(`This user is not in a voice channel!`, member.displayAvatarURL({dynamic: true}))
            .addField(`Member`, `<@${member.id}>`)
            return message.channel.send(memberembed)
        }
        if(!message.member.voice.channel){
            const memberembed = new Discord.MessageEmbed()
            .setAuthor(`You need to be in a voice channel!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(memberembed)
        }

        try {
            member.voice.setChannel(message.member.voice.channel)

            let successembed = new Discord.MessageEmbed()
            .setDescription(`<@${member.id}> **is pulled to** \`${message.member.voice.channel.name}\``)
            message.channel.send(successembed)

        } catch(err) {
            let errembed = new Discord.MessageEmbed()
            .setDescription(`**There is an error occurred:** ${err}`)
            message.channel.send(errembed)
        }
        

        



    }
}