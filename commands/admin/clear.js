module.exports = {
    name: 'clear',
    aliases: ['clean', 'delete', 'sil', 'temizle'],
    cooldown: 0,
    description: 'Clear messages!',
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;
        if(!args[0]){
            let argsembed0 = new Discord.MessageEmbed()
            .setAuthor(`Please enter the amount of messages you want to clear!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(argsembed0).then(m => {
                m.delete({ timeout: 10000 })
            })
        } 
        if(isNaN(args[0])){
            let argsembed1 = new Discord.MessageEmbed()
            .setAuthor(`Please enter a real number!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(argsembed1).then(m => {
                m.delete({ timeout: 10000 })
            })
        }
        
        if(args[0] > 100){
            let argsembed2 = new Discord.MessageEmbed()
            .setAuthor(`You cannot delete more than 100 messages!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(argsembed2).then(m => {
                m.delete({ timeout: 10000 })
            })
        }
        if(args[0] < 1){
            let argsembed3 = new Discord.MessageEmbed()
            .setAuthor(`You must delete at least one message!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send(argsembed3).then(m => {
                m.delete({ timeout: 10000 })
            })
        }
        let argsembed4 = new Discord.MessageEmbed()
        .setAuthor(`Deleted ${args[0]} messages on #${message.channel.name}`, user.displayAvatarURL({dynamic: true}))
        
        //For delete messages
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages).then(
                message.channel.send(argsembed4).then(message => {
                    message.delete({ timeout: 7500 })
                })
            )
        })
    }
}