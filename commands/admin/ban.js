module.exports = {
    name: 'ban',
    aliases: ['engelle'],
    description: 'ban',
    async execute(client, message, args, Discord){
        const user = message.mentions.users.first()
        
        if(!user){
            return message.channel.send('')
        }
    }
}