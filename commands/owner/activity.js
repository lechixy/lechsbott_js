module.exports = {
    name: "activity",
    cooldown: '0',
    aliases: ["actv"],
    description: "Returns user information",
    async execute(client, message, args, cmd, Discord){
        const { OWNER1 } = require("../util/lechsbottUtil");
        const { OWNER2 } = require("../util/lechsbottUtil");

        if(message.author.id == OWNER1 || message.author.id == OWNER2){
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