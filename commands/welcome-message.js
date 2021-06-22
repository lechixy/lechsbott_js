module.exports = {
    name: 'welcomemessage',
    description: 'ha',
    async execute(client, message, args, cmd, Discord, Tags, tag) {
        const data = tag.get("welcome_message");

        if(args[0] === 'channel'){
            const mentionedchannel = message.mentions.channels.first();

            if(!mentionedchannel) return message.channel.send('You need to tag a channel to set welcome message!')

            data.channel_id = mentionedchannel.id;

            await Tags.update({ welcome_message: data}, {where: {guild_id: message.guild.id}})
        } else if(args[0] === 'message'){
            const text = args.splice(1, args.length-1).join(" ");

            if(!text) return message.channel.send('You need to type a message to set welcome message\'s message!')
        
            data.message = text;

            await Tags.update({welcome_message: data}, {where: {guild_id: message.guild.id}})
        } else if(args[0] === 'enable'){
            data.enabled = true;

            await Tags.update({welcome_message: data}, {where: {guild_id: message.guild.id}})

            if(!data.channel_id) return message.channel.send('There is nothing about channel data!')

            message.channel.send(`Welcome message setted to **enabled** for <#${data.channel_id}>`)
        } else if(args[0] === 'disable'){
            data.enabled = false;

            await Tags.update({welcome_message: data}, {where: {guild_id: message.guild.id}})

            if(!data.channel_id) return message.channel.send('There is nothing about channel data!')

            message.channel.send(`Welcome message setted to **disabled** for <#${data.channel_id}>`)

        }


        console.log(data)
    }
}