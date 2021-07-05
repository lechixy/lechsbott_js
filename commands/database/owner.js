module.exports = {
    name: 'addm',
    aliases: ['setm', ''],
    description: '',
    async execute(client, message, args, cmd, Discord, Users) {
        const users = await Users.findOne({where: { user_id: message.author.id }})
        const user = message.author;

        if(cmd === 'addm'){
            const mauth = message.author;
            if(!message.mentions.users.first()) {
                let thereisno = new Discord.MessageEmbed()
                .setAuthor(`You need to tag user and type amount of money!`, mauth.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `l!addm @Lechixy#1987 <amount>`)
                return message.channel.send(thereisno)
            }
            if(!args[0]){
                let argsembed = new Discord.MessageEmbed()
                .setAuthor(`You need to type amount of money!`, mauth.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `l!addm @Lechixy#1987 <amount>`)
                return message.channel.send(argsembed)
            }
            let m = message.mentions.users.first();
            let userid = m.id;
            const usersother = await Users.findOne({where: { user_id: userid }})

            if(usersother === null){
                let arenotregisteredembed = new Discord.MessageEmbed()
                .setAuthor(`No results found... This is user isn't registered to system!`, m.displayAvatarURL({dynamic: true}))
                return message.channel.send(arenotregisteredembed)
            }

            const data = usersother.get("user_infos");

            let money = usersother.user_infos.money
            usersother.user_infos.money = money + (args[1] * 1);
            await Users.update({user_infos: data}, {where: {user_id: message.author.id }})

            let addedembed = new Discord.MessageEmbed()
            .setAuthor(`Added $${args[1]} to ${m.username}`, mauth.displayAvatarURL({dynamic: true}))
            .addField(`Current Balance`, `\`\`\`yaml\n$${usersother.user_infos.money.toLocaleString()}\`\`\``, true)
            .addField(`By`, `<@${user.id}>`, true)
            return message.channel.send(addedembed)
        }
        if(cmd === 'setm'){
            const mauth = message.author;
            if(!message.mentions.users.first()) {
                let thereisno = new Discord.MessageEmbed()
                .setAuthor(`You need to tag user and type amount of money!`, mauth.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `l!setm @Lechixy#1987 <amount>`)
                return message.channel.send(thereisno)
            }
            if(!args[0]){
                let argsembed = new Discord.MessageEmbed()
                .setAuthor(`You need to type amount of money!`, mauth.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `l!setm @Lechixy#1987 <amount>`)
                return message.channel.send(argsembed)
            }
            let m = message.mentions.users.first();
            let userid = m.id;
            const usersother = await Users.findOne({where: { user_id: userid }})

            if(usersother === null){
                let arenotregisteredembed = new Discord.MessageEmbed()
                .setAuthor(`No results found... This is user isn't registered to system!`, m.displayAvatarURL({dynamic: true}))
                return message.channel.send(arenotregisteredembed)
            }

            const data = usersother.get("user_infos");

            usersother.user_infos.money = (args[1] * 1);
            await Users.update({user_infos: data}, {where: {user_id: message.author.id }})

            let settedembed = new Discord.MessageEmbed()
            .setAuthor(`Setted $${args[1]} to ${m.username}`, mauth.displayAvatarURL({dynamic: true}))
            .addField(`Current Balance`, `\`\`\`yaml\n$${usersother.user_infos.money.toLocaleString()}\`\`\``, true)
            .addField(`By`, `<@${user.id}>`, true)
            return message.channel.send(settedembed)
        }
    }
}