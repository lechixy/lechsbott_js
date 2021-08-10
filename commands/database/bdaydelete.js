module.exports = {
    name: 'bdaydelete',
    aliases: ['birthdaydelete', 'bdayremove', 'birthdayremove'],
    description: 'A birthday delete command!',
    async execute(client, message, args, cmd, Discord /*, Users */){
        return message.channel.send('Command disabled!')

        const user = message.author;
        const users = await Users.findOne({where: { user_id: message.author.id }})

        if(users === null){
            let arenotregisteredembed = new Discord.MessageEmbed()
            .setDescription(`If you want to use this command you must register to lechsbott system! It's very easy just look below!`)
            .addField(`Usage`, `l!register`)
            return message.channel.send({ embeds: [arenotregisteredembed] })
        }

        if(users.user_infos.bday === null){
            let arenotregisteredembed = new Discord.MessageEmbed()
            .setDescription(`You need to save your l!birthday information before using this command`)
            .addField(`Usage`, `l!birthday`)
            return message.channel.send({ embeds: [arenotregisteredembed] })
        }

        const data = users.get("user_infos")

        users.user_infos.bday = null
        await Users.update({user_infos: data}, {where: {user_id: message.author.id }})

        let succesembed = new Discord.MessageEmbed()
        .setAuthor(`Your birthday is removed!`, user.displayAvatarURL({dynamic: true}))
        return message.channel.send({ embeds: [succesembed] })
    }
}