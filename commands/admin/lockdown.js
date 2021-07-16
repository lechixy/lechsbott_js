module.exports = {
    name: 'lock',
    aliases: 'lockdown',
    description: 'A lock channel command!',
    async execute(client, message, args, cmd, Discord) {
        if(!message.member.permissions.has('ADMINISTRATOR')){
            let permebed = new Discord.MessageEmbed()
            .setAuthor(`Unauthorized command`, message.author.displayAvatarURL({dynamic: true}))
            .addField(`Missing Permissions`, `Administrator`)
            message.channel.send(permebed)
        }

        const role = message.guilds.roles.everyone;

        if(!args.length){
            const argsembed = new Discord.MessageEmbed()
            .setAuthor(`Please specify a query`, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(argsembed);
        }

        const query = args[0].toLowerCase()

        if(!['true', 'false'].includes(query)){
            const embed = new Discord.MessageEmbed()
            .setAuthor("The option you have stated is not valid!", message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(embed);
        }

        const perms = role.permissions.toArray()

        if(query === 'false'){
            perms.push("SEND_MESSAGES");
            console.log(perms)
            await role.edit({ permissions: perms })
            const embed = new Discord.MessageEmbed()
            .setAuthor("Server is unlocked!", message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(embed);
        } else {
            const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES')
            console.log(newPerms)

            await role.edit({ permissions: newPerms })
            const embed = new Discord.MessageEmbed()
            .setAuthor("Server is now locked down!", message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(embed);

        }

        
        
    }
}