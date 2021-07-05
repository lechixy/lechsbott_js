module.exports = {
    name: 'bet',
    aliases: '',
    cooldown: 3,
    description: '',
    async execute(client, message, args, cmd, Discord, Users) {
        const users = await Users.findOne({where: { user_id: message.author.id }})
        const user = message.author;

        if(cmd === 'bet'){
            if(users === null){
                let arenotregisteredembed = new Discord.MessageEmbed()
                .setDescription(`You are not registered to system, if you want register use l!register`)
                return message.channel.send(arenotregisteredembed)
            }
            else if(users.user_id === message.author.id){
                const money = users.user_infos.money
                const data = users.get("user_infos");
                if(!args[0]){
                    let argsembed = new Discord.MessageEmbed()
                    .setAuthor(`You need to type amount of the bet`, user.displayAvatarURL({dynamic: true}))
                    .setDescription(`If you place a bet, it will take the amount you have written from your current money and will either give you that amount at all or double it, depending on your luck. The chance is that 55% for loss and 45% for win`)
                    .addField(`Usage`, `l!bet <amount>`, true)
                    .addField(`Limits`, `You can deposit at least $500 most $50000`, true)
                    return message.channel.send(argsembed)
                }
                if(isNaN(args[0])){
                    let numberembed = new Discord.MessageEmbed()
                    .setAuthor(`Please type a real number!`, user.displayAvatarURL({dynamic: true}))
                    return message.channel.send(numberembed)
                }
                if(args[0] < 500){
                    let maxembed = new Discord.MessageEmbed()
                    .setAuthor(`You can bet at least 500 money!`, user.displayAvatarURL({dynamic: true}))
                    return message.channel.send(maxembed)
                }
                if(args[0] > 50000){
                    let maxembed = new Discord.MessageEmbed()
                    .setAuthor(`You can bet most 50000 money!`, user.displayAvatarURL({dynamic: true}))
                    return message.channel.send(maxembed)
                }
                if(args[0] > money){
                    let moneyembed = new Discord.MessageEmbed()
                    .setAuthor(`There is not enough money for play bet!`, user.displayAvatarURL({dynamic: true}))
                    return message.channel.send(moneyembed)
                }

                const chance = 60
                const amount = args[0]

                const randomed = Math.floor(Math.random() * 101)

                if(randomed >= chance){
                    users.user_infos.money = money + (args[0] * 2);
                    await Users.update({user_infos: data}, {where: {user_id: message.author.id }})
                    let winembed = new Discord.MessageEmbed()
                    .setAuthor(`Result is you won the bet!`, user.displayAvatarURL({dynamic: true}))
                    .setColor('#0A7900')
                    .addField(`Total Balance`, `\`\`\`yaml\n$${money.toLocaleString()}\`\`\``, true)
                    .addField(`Earned`, `\`\`\`yaml\n+${(args[0]*2).toLocaleString()}\`\`\``, true)
                    .addField(`Now have`, `\`\`\`yaml\n$${(users.user_infos.money).toLocaleString()}\`\`\``, true)
                    return message.channel.send(winembed)
                }
                else if(randomed <= chance){
                    users.user_infos.money = money - args[0];
                    await Users.update({user_infos: data}, {where: {user_id: message.author.id }})
                    let lostembed = new Discord.MessageEmbed()
                    .setAuthor(`Result is you losted the bet!`, user.displayAvatarURL({dynamic: true}))
                    .setColor('#790000')
                    .addField(`Total Balance`, `\`\`\`yaml\n$${money.toLocaleString()}\`\`\``, true)
                    .addField(`Losted`, `\`\`\`diff\n-${args[0].toLocaleString()}\`\`\``, true)
                    .addField(`Now have`, `\`\`\`yaml\n$${(users.user_infos.money).toLocaleString()}\`\`\``, true)
                    return message.channel.send(lostembed)
                }
            }



        }
    }
}