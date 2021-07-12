module.exports = {
    name: 'register',
    aliases: ["reregister", "profiledelete", "profile", "profileof","profileoptions", "money", "balance"],
    cooldown: 3,
    description: 'database',
    async execute(client, message, args, cmd, Discord, Users) {
        const users = await Users.findOne({where: { user_id: message.author.id }})
        const user = message.author;

        //For register
        if(cmd === 'register'){
            if(users === null){
                await Users.create({ user_id: message.author.id })
                // await Users.update({user_id: message.author.id ,user_password: args[0] }, { where: {user_id: message.author.id } })
                let successembed = new Discord.MessageEmbed()
                .setDescription(`**Successfully registered** to system!`)
                return message.channel.send(successembed)
            }
            else if(users.user_id === message.author.id){
                let errorembed = new Discord.MessageEmbed()
                .setDescription(`You are **already registered** to system!`)
                return message.channel.send(errorembed)
            }
        }
        //For reregister
        else if(cmd === 'reregister'){
            if(users === null){
                let arenotregisteredembed = new Discord.MessageEmbed()
                .setDescription(`You are not registered to system, if you want register use l!register`)
                return message.channel.send(arenotregisteredembed)
            }
            else if(users.user_id === message.author.id){
                await users.destroy()
                await Users.create({ user_id: message.author.id })
                let reregisteredembed = new Discord.MessageEmbed()
                .setDescription(`You registered to system again! All your data setted to default values...`)
                return message.channel.send(reregisteredembed)
            }
        }
        //For account delete
        else if(cmd === 'profiledelete'){
            if(users === null){
                let arenotregisteredembed = new Discord.MessageEmbed()
                .setDescription(`You **aren't registered** to system, if you want register use \`l!register\``)
                return message.channel.send(arenotregisteredembed)
            }
            else if(users.user_id === message.author.id){
                await users.destroy()
                let deletedembed = new Discord.MessageEmbed()
                .setDescription(`Your system **account deleted** all your data is deleted!`)
                return message.channel.send(deletedembed)
            }

        }
        //For profile
        else if(cmd === 'profile'){
            if(users === null){
                let arenotregisteredembed = new Discord.MessageEmbed()
                .setDescription(`You are not registered to system, if you want register use l!register`)
                return message.channel.send(arenotregisteredembed)
            }
            else if(users.user_id === message.author.id){
                const userpp = message.author.displayAvatarURL({dynamic: true})
                
                let descdefault = `We don't know much about them, but we're sure ${message.author.username} is great.`

                let desc;
                if(users.user_infos.description === null) desc = descdefault;
                else desc = users.user_infos.description;

                const money = users.user_infos.money.toLocaleString();

                const levelofxp = users.user_infos.level.toString()
                const justxp = levelofxp.slice(levelofxp.length - 2 , levelofxp.length)
                const uppest = Math.ceil(levelofxp/100)*100
                const lowest = uppest - 100;
                const mathsom = users.user_infos.level / 100
                const roundedxptop = Math.ceil(mathsom)
                const roundedxpless = roundedxptop - 1;

                let profilembed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}`, userpp)
                .setDescription(desc)
                .setThumbnail(userpp)
                .addField(`Role`, `\`\`\`${users.user_infos.role}\`\`\``, true)
                .addField(`Balance`, `\`\`\`yaml\n$${money}\`\`\``, true)
                .addField(`Job`, `\`\`\`undefined\`\`\``, true)
                .addField('\u200B', '\u200B')
                .addField(`Badges`, `**${users.user_infos.badges}**`, true)
                .addField(`Achievements`, `\`\`\`${users.user_infos.achi}\`\`\``, true)
                .addField(`Level`, `\`${roundedxpless}lvl\`**▬▬▬▬▬▬▬▬▬**\`${justxp}xp\`**▬▬▬▬▬▬▬▬▬**\`${roundedxptop}lvl\``)
                .setTimestamp()
                return message.channel.send(profilembed)
            }
        }
        //other user profile
        else if(cmd === 'profileof'){
            const mauth = message.author;
            if(!message.mentions.users.first()) {
                let thereisno = new Discord.MessageEmbed()
                .setAuthor(`You need to tag a user for look at user's profile!`, mauth.displayAvatarURL({dynamic: true}))
                return message.channel.send(thereisno)
            }
            let m = message.mentions.users.first();
            let userid = m.id;

            const usersother = await Users.findOne({where: { user_id: userid }})

            if(usersother === null){
                let arenotregisteredembed = new Discord.MessageEmbed()
                .setAuthor(`No results found... This is user isn't registered to system!`, m.displayAvatarURL({dynamic: true}))
                return message.channel.send(arenotregisteredembed)
            }
            else if(usersother.user_id === usersother.user_id){
                const userpp = m.displayAvatarURL({dynamic: true})
                
                let descdefault = `We don't know much about them, but we're sure ${m.username} is great.`

                let desc;
                if(usersother.user_infos.description === `lechixy1987`) desc = descdefault;
                else desc = usersother.user_infos.description;

                const money = usersother.user_infos.money.toLocaleString();

                const levelofxp = usersother.user_infos.level.toString()
                const justxp = levelofxp.slice(levelofxp.length - 2 , levelofxp.length)
                const uppest = Math.ceil(levelofxp/100)*100
                const lowest = uppest - 100;
                const mathsom = usersother.user_infos.level / 100
                const roundedxptop = Math.ceil(mathsom)
                const roundedxpless = roundedxptop - 1;

                let profilembed = new Discord.MessageEmbed()
                .setAuthor(`${m.username}`, userpp)
                .setDescription(desc)
                .setThumbnail(userpp)
                .addField(`Role`, `\`\`\`${usersother.user_infos.role}\`\`\``, true)
                .addField(`Balance`, `\`\`\`yaml\n$${money}\`\`\``, true)
                .addField(`Job`, `\`\`\`undefined\`\`\``, true)
                .addField('\u200B', '\u200B')
                .addField(`Badges`, `**${usersother.user_infos.badges}**`, true)
                .addField(`Achievements`, `\`\`\`${usersother.user_infos.achi}\`\`\``, true)
                .addField(`Level`, `\`${roundedxpless}lvl\`**▬▬▬▬▬▬▬▬▬**\`${justxp}xp\`**▬▬▬▬▬▬▬▬▬**\`${roundedxptop}lvl\``)
                .setTimestamp()
                return message.channel.send(profilembed)
            }
        }
        //For profile options
        else if(cmd === 'profileoptions'){
            //For change description
            if(args[0] === `desc`){
                if(users === null){
                    let arenotregisteredembed = new Discord.MessageEmbed()
                    .setAuthor(`You are not registered to system, if you want register use l!register`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send(arenotregisteredembed)
                }
                else if(users.user_id === message.author.id){
                    if(!args[0]){
                        let argsembed = new Discord.MessageEmbed()
                        .setDescription(`You need to type a **beatiful** text for profile description!`)
                        return message.channel.send(argsembed)
                    }
                    const data = users.get("user_infos");
                    const customdesc = message.content.slice(21, message.content.length)
    
                    if(customdesc.length > 100){
                        let morelengthembed = new Discord.MessageEmbed()
                        .setDescription(`Max description is 100 characters for profile description\nplease reduce your beatiful text :)`)
                        return message.channel.send(morelengthembed)
                    }

                    users.user_infos.description = customdesc
                    await Users.update({user_infos: data}, {where: {user_id: message.author.id }})
    
                    let successembed = new Discord.MessageEmbed()
                    .setDescription(`Profile description successfully setted to ${customdesc}`)
                    return message.channel.send(successembed)
                }
            }
            if(args[0] === `resetdesc`){
                if(users === null){
                    let arenotregisteredembed = new Discord.MessageEmbed()
                    .setAuthor(`You are not registered to system, if you want register use l!register`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send(arenotregisteredembed)
                }
                else if(users.user_id === message.author.id){
                    const data = users.get("user_infos");

                    if(users.user_infos.description === 'lechixy1987'){
                        let nothingembed = new Discord.MessageEmbed()
                        .setDescription(`There is no profile description for your profile`)
                        return message.channel.send(nothingembed)
                    }

                    users.user_infos.description = 'lechixy1987'
                    await Users.update({user_infos: data}, {where: {user_id: message.author.id }})
    
                    let successembed = new Discord.MessageEmbed()
                    .setDescription(`Profile description successfully resetted!`)
                    return message.channel.send(successembed)
                }
            }
            //For profile options embed
            else if(!args[0]){
                const userpp = message.author.displayAvatarURL({dynamic: true})

                let profileoptions = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}`, userpp)
                .setTitle(`Profile Options`)
                .setDescription(`You can change your profile settings from here!`)
                .addField('\u200B', '\u200B')
                .addField(`Customize Description`, `\`l!profileoptions description <your beatiful text>\``, true)
                .addField(`Reset Description`, `\`l!profileoptions descriptionreset\``, true)
                message.channel.send(profileoptions)
            }
        }
        //For money
        else if(cmd === 'money' || cmd === 'balance'){
            if(users === null){
                let arenotregisteredembed = new Discord.MessageEmbed()
                .setDescription(`You are not registered to system, if you want register use l!register`)
                return message.channel.send(arenotregisteredembed)
            }
            else if(users.user_id === message.author.id){
                const money = users.user_infos.money

                let moneyembed = new Discord.MessageEmbed()
                .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
                .addField(`Balance`, `\`\`\`yaml\n$${money.toLocaleString()}\`\`\``)
                message.channel.send(moneyembed)
            }
        }

        
    }
}