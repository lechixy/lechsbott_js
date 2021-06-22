module.exports = {
    name: 'register',
    aliases: ["reregister", "accountdelete"],
    description: 'database',
    async execute(client, message, args, cmd, Discord, Users) {
        const users = await Users.findOne({where: { user_id: message.author.id}})

        if(cmd === 'register'){
            if(users === null){
                await Users.create({ user_id: message.author.id })
                // await Users.update({user_id: message.author.id ,user_password: args[0] }, { where: {user_id: message.author.id } })
                return message.channel.send('Successfully registered to system!')
            }
            else if(users.user_id === message.author.id){
                return message.channel.send('You are already registered to system!')
            }
        }
        else if(cmd === 'reregister'){
            if(users === null){
                return message.channel.send('You are not registered to system, if you want register use \`l!register\`')
            }
            else if(users.user_id === message.author.id){
                await users.destroy()
                await Users.create({ user_id: message.author.id })
                return message.channel.send('You registered to system again! All your data setted to default values...')
            }
        }
        else if(cmd === 'accountdelete'){
            if(users === null){
                return message.channel.send('You are not registered to system, if you want register use \`l!register\`')
            }
            else if(users.user_id === message.author.id){
                await users.destroy()
                return message.channel.send('You deleted system account for yourself... All your data is deleted!')
            }

        }
        // const data = users.get()

        // await Tags.destroy({where: { guild_id: message.guild.id}})

    //    await Tags.update({user_id: message.author.id ,user_password: args[0] }, { where: {user_id: message.author.id } })

        
    }
}