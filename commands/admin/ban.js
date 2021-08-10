module.exports = {
    name: 'ban',
    aliases: ['unban', 'pardon', 'kick'],
    description: 'ban',
    async execute(client, message, args, cmd, Discord){
        const user = message.author;
        const member = message.mentions.members.first();

        if(cmd === 'ban'){
            
            if(!message.member.permissions.has("BAN_MEMBERS")){
                let permembed = new Discord.MessageEmbed()
                .setAuthor(`You hasn't following permissions`, user.displayAvatarURL({dynamic: true}))
                .addField(`Permission`, `Ban Members`)
                return message.channel.send({ embeds: [permembed] })
            }
            if(!member){
                let membembed = new Discord.MessageEmbed()
                .setAuthor(`Please mention a member for ban!`, user.displayAvatarURL({dynamic: true}))
                return message.channel.send({ embeds: [membembed] })
            }
            if (message.member.roles.highest.position <= member.roles.highest.position) {
                let erembed = new Discord.MessageEmbed()
                .setDescription(`You can't do that because you either have the same role or your role is lower!`)
                return message.channel.send({ embeds: [erembed] })
            }
            

            const reason = args.slice(1).join(" ") || `No reason provided`
            const d = new Date()
            const fulldate = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

            let succesembed = new Discord.MessageEmbed()
            .setDescription(`<@${member.id}> banned from server by ${user.tag}`)
            .addField(`Reason`, reason, true)
            .addField(`Banned`, `<@${member.id}>`, true)
            .addField(`At`, fulldate, true)
            message.channel.send({ embeds: [succesembed] })
            member.ban({ reason })


        }
        else if(cmd === 'kick'){
            
            if(!message.member.permissions.has("KICK_MEMBERS")){
                let permembed = new Discord.MessageEmbed()
                .setAuthor(`You hasn't following permissions`, user.displayAvatarURL({dynamic: true}))
                .addField(`Permission`, `Kick Members`)
                return message.channel.send({ embeds: [permembed] })
            }
            if(!member){
                let membembed = new Discord.MessageEmbed()
                .setAuthor(`Please mention a member for kick!`, user.displayAvatarURL({dynamic: true}))
                return message.channel.send({ embeds: [membembed] })
            }
            if (message.member.roles.highest.position <= member.roles.highest.position) {
                let erembed = new Discord.MessageEmbed()
                .setDescription(`You can't do that because you either have the same role or your role is lower!`)
                return message.channel.send({ embeds: [erembed] })
            }

            const reason = args.slice(1).join(" ") || `No reason provided`

            member.kick({ reason })
            let succesembed = new Discord.MessageEmbed()
            .setAuthor(`${member.id} kicked from server by ${user.tag}`, user.displayAvatarURL({dynamic: true}))
            .addField(`Reason`, reason, true)
            .addField(`Kicked user`, `<@${member.id}>`, true)
            .addField(`Date`, fulldate, true)
            message.channel.send({ embeds: [succesembed] })
        }
        else if(cmd === 'unban' || cmd === 'pardon'){
            if(!message.member.permissions.has("BAN_MEMBERS")){
                let permembed = new Discord.MessageEmbed()
                .setAuthor(`You hasn't following permissions`, user.displayAvatarURL({dynamic: true}))
                .addField(`Permission`, `Ban Members`)
                return message.channel.send({ embeds: [permembed] })
            }

            const id = args[0]
            if(!id){
                let notembed = new Discord.MessageEmbed()
                .setAuthor(`You need to provide a Discord User Id want to unban!`, user.displayAvatarURL({dynamic: true}))
                return message.channel.send({ embeds: [notembed] })
            }

            const bannedMembers = await message.guild.fetchBans();
            if(!bannedMembers.find((user) => user.user.id === id)){
                let notembed = new Discord.MessageEmbed()
                .setAuthor(`User with ${args[0]} id, isn't banned!`, user.displayAvatarURL({dynamic: true}))
                return message.channel.send({ embeds: [notembed] })
            }

            message.guild.members.unban(id);
            let succesembed = new Discord.MessageEmbed()
            .setDescription(`**User** \`${args[0]}\` **is now unbanned!**`)
            .setColor("#00FF15")
            message.channel.send({ embeds: [succesembed] })
        }
    }
}