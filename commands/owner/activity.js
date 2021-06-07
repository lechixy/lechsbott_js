module.exports = {
    name: "activity",
    cooldown: '0',
    aliases: ["actv"],
    description: "Returns user information",
    async execute(client, message, args, cmd, Discord){
        if(message.author.id == "391511241786654721"){
            if (!args.length) return message.channel.send('You need to tag a person to execute the command!').then(message => {
                message.delete({ timeout: 1500 })
            })
            
            const person = message.guild.member(message.mentions.users.first());
            
            console.log(person.user.presence);
            message.channel.send('Required message\'s sent to owner!').then(message => {
                message.delete({ timeout: 1500 })
            })
        } else {
            message.channel.send('This is an owner command, you can\'t use it!').then(message => {
                message.delete({ timeout: 3000 })
            })
        }

        
    }
}