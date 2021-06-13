module.exports = {
    name: 'clear',
    aliases: ['clean', 'delete', 'sil', 'temizle'],
    cooldown: 0,
    description: 'Clear messages!',
    async execute(client, message, args) {
        if(!args[0]) return message.reply('Please enter the amount of messages u want to clear!');
        if(isNaN(args[0])) return message.reply('Please enter a real number!');
        
        if(args[0] > 100) return message.reply('You cannot delete more than 100 messages!');
        if(args[0] < 1) return message.reply('You must delete at least one message!');

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages).then(
                message.channel.send("Deleted " + args[0] + " messages!").then(message => {
                    message.delete({ timeout: 1500 })
                })
            )
        })
    }
}