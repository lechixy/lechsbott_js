module.exports = {
    name: 'bday',
    aliases: ['birthday'],
    description: 'A birthday command!',
    async execute(client, message, args, cmd, Discord, Users) {
        const user = message.author;
        const users = await Users.findOne({where: { user_id: message.author.id }})
        
        if(users === null){
             let arenotregisteredembed = new Discord.MessageEmbed()
             .setDescription(`If you want to use this command you must register to lechsbott system! It's very easy just look below!`)
             .addField(`Usage`, `l!register`)
             return message.channel.send(arenotregisteredembed)
        }
        
        if(args[0]){
            const months = {
                1: "January",
                2: "February",
                3: "March",
                4: "April",
                5: "May",
                6: "June",
                7: "July",
                8: "August",
                9: "September",
                10: "October",
                11: "November",
                12: "December"
            }
            
            const joined = args.join(" ");
            const split = joined.trim().split("/");
          
            let [ day, month ] = split;
          
            if(!day){
                let errembed = new Discord.MessageEmbed()
                .setAuthor(`You need to type the day correctly`, user.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `l!bday <DAY/MONTH>`)
                return message.channel.send(errembed)
            }
            if(!month){
                let errembed = new Discord.MessageEmbed()
                .setAuthor(`You need to type the month correctly`, user.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `l!bday <DAY/MONTH>`)
                return message.channel.send(errembed)
            }
          
            if(isNaN(day) || isNaN(month)){
                let errembed = new Discord.MessageEmbed()
                .setAuthor(`You must type the day and month as numbers`, user.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `l!bday <DAY/MONTH>`)
                return message.channel.send(errembed)
            }
          
          
            day = parseInt(day);
            month = parseInt(month)
          
            if(day > 31) {
                let errembed = new Discord.MessageEmbed()
                .setAuthor(`Wrong day format`, user.displayAvatarURL({dynamic: true}))
                return message.channel.send(errembed)
            }
          
            if(month > 12) {
                let errembed = new Discord.MessageEmbed()
                .setAuthor(`Wrong day format`, user.displayAvatarURL({dynamic: true}))
                return message.channel.send(errembed)
            }
          
            const convertedDay = suffixes(day)
            const convertedMonth = months[month]
    
            const data = users.get("user_infos");
            
            users.user_infos.bday = `${convertedDay} of ${convertedMonth}`
            await Users.update({user_infos: data}, {where: {user_id: message.author.id }})
    
            let bdayembed = new Discord.MessageEmbed()
            .setAuthor(`Your birthday is updated to ${users.user_infos.bday}`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(bdayembed)
          
            function suffixes(number){
                const converted = number.toString()
                
                const lastChar = converted.charAt(converted.length - 1)
                
                return lastChar == '1' ? 
                  `${converted}st` : lastChar == '2' ?
                    `${converted}nd` : lastChar == '3' ?
                      `${converted}rd` : `${converted}th`
            }
        }
        else if(!args[0]){
            let argsembed = new Discord.MessageEmbed()
            .setAuthor(`You need to type a date`, user.displayAvatarURL({dynamic: true}))
            .addField(`Usage`, `l!bday <DAY/MONTH>`)
            return message.channel.send(argsembed)
        }
    }
}
