module.exports = {
    name: 'pullmember',
    description: 'pull a member',
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;

        if (!message.member.permissions.has("MOVE_MEMBERS") && !message.member.permissions.has("MANAGE_CHANNELS")) {
            let permsembed = new Discord.MessageEmbed()
                .setDescription(`**You are not able to use this command!**`)
                .addField(
                    "Needed Permissions",
                    "Move Members and Manage Channels"
                );
                return message.channel.send({ embeds: [permsembed] }).then(m => {
                    setTimeout(function() { m.delete() }, 10000)
                })
        }

        if (!message.guild.me.permissions.has("MOVE_MEMBERS") && !message.guild.me.permissions.has("MANAGE_CHANNELS")) {
            let permsembed = new Discord.MessageEmbed()
                .setDescription(`**There are missing permissions for lechsbott**`)
                .addField(
                    "Needed Permissions",
                    "Move Members and Manage Channels"
                );
                return message.channel.send({ embeds: [permsembed] }).then(m => {
                    setTimeout(function() { m.delete() }, 10000)
                })
        }

        const member = message.mentions.members.first();

        if(!member){
            const memberembed = new Discord.MessageEmbed()
            .setAuthor(`Please mention a member to pull!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [memberembed] }).then(m => {
                setTimeout(function() { m.delete() }, 10000)
            })
        }
        if(!member.voice.channel){
            const memberembed = new Discord.MessageEmbed()
            .setAuthor(`This user is not in a voice channel!`, member.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [memberembed] }).then(m => {
                setTimeout(function() { m.delete() }, 10000)
            })
        }
        if(!message.member.voice.channel){
            const memberembed = new Discord.MessageEmbed()
            .setAuthor(`You need to be in a voice channel!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [memberembed] }).then(m => {
                setTimeout(function() { m.delete() }, 10000)
            })
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