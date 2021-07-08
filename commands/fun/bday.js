module.exports = {
    name: 'bday',
    description: 'A birthday command!',
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;
        
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
            message.channel.send(errembed)
        }
        if(!month){
            let errembed = new Discord.MessageEmbed()
            .setAuthor(`You need to type the month correctly`, user.displayAvatarURL({dynamic: true}))
            .addField(`Usage`, `l!bday <DAY/MONTH>`)
            message.channel.send(errembed)
        }
      
        if(isNaN(day) || isNaN(month)){
            let errembed = new Discord.MessageEmbed()
            .setAuthor(`You must type the day and month as numbers`, user.displayAvatarURL({dynamic: true}))
            .addField(`Usage`, `l!bday <DAY/MONTH>`)
            message.channel.send(errembed)
        }
      
      
        day = parseInt(day);
        month = parseInt(month)
      
        if(day > 31) {
            let errembed = new Discord.MessageEmbed()
            .setAuthor(`Wrong day format`, user.displayAvatarURL({dynamic: true}))
            message.channel.send(errembed)
        }
      
        if(month > 12) {
            let errembed = new Discord.MessageEmbed()
            .setAuthor(`Wrong day format`, user.displayAvatarURL({dynamic: true}))
            message.channel.send(errembed)
        }
      
        const convertedDay = suffixes(day)
        const convertedMonth = months[month]
        
        message.channel.send(`${convertedDay} of ${convertedMonth}`)
      
        function suffixes(number){
            const converted = number.toString()
            
            const lastChar = converted.charAt(converted.length - 1)
            
            return lastChar == '1' ? 
              `${converted}st` : lastChar == '2' ?
                `${converted}nd` : lastChar == '3' ?
                  `${converted}rd` : `${converted}th`
        }
      
    }
}
