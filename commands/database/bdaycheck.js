module.exports = {
    name: 'chechbirthday',
    aliases: ['checkbday', '', 'birthdaycheck', 'bdaycheck'],
    description: 'A birthday check command!',
    async execute(client, message, args, cmd, Discord /*, Users */){
        return message.channel.send('Command disabled!')

        let user;
        if(message.mentions.users.first()) user = message.mentions.users.first()
        else user = message.author;


        const users = await Users.findOne({where: { user_id: user.id }})

        
        if(users === null){
            let arenotregisteredembed = new Discord.MessageEmbed()
            .setDescription(`This user isn't registered to system!`)
            .addField(`If you want register`, `l!register`)
            return message.channel.send(arenotregisteredembed)
        }
        

        if(users.user_infos.bday === null){
            let arenotregisteredembed = new Discord.MessageEmbed()
            .setDescription(`This user isn't saved birthday info to system!`)
            .addField(`Usage`, `l!birthday`)
            return message.channel.send(arenotregisteredembed)
        }

        let bdayembed = new Discord.MessageEmbed()
        .setAuthor(`${user.username}'s birthday is ${users.user_infos.bday}`, user.displayAvatarURL({dynamic: true}))
        return message.channel.send(bdayembed)
    }
}