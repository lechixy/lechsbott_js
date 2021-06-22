const fetch = require("node-fetch");
const { TWITCH_TOKEN, TWITCH_CLIENT_ID} = require("./util/lechsbottUtil")

module.exports = {
    name: 'twitch',
    description: 'twitch',
    async execute(client, message, args, cmd, Discord, Tags, tag) {

        const data = tag.get("twitch_data");

        if(args[0] === 'channel'){
            const mentionedChannel = message.mentions.channels.first();

            if(!mentionedChannel) return message.channel.send('Please mention a channel for notifications!');

            data.d_channel_id = mentionedChannel.id;

            await Tags.update({twitch_data: data}, {where: {guild_id: message.guild.id}})
            return message.channel.send(`Twitch live notifications **succesfully setted** for <#${data.d_channel_id}>`)
        } else if(args[0] === 'enable'){
            if(!data.t_channel_name) return message.channel.send('Before **enable** Twitch Notifications please set a twitch channel with \`l!twitch <twitch user name for notifications>\` command!')
            if(!data.d_channel_id) return message.channel.send('Before **enable** Twitch Notifications please set a discord channel with \`l!twitch channel <#examplechannel>\` command!')

            data.enabled = true;

            await Tags.update({twitch_data: data}, {where: {guild_id: message.guild.id}})
            return message.channel.send(`Twitch live notifications **enabled** for <#${data.d_channel_id}>`)
        } else if(args[0] === 'disable'){
            if(!data.t_channel_name) return message.channel.send('You can\'t **disable** Twitch Notifications before set a twitch channel: \`l!twitch <twitch user name for notifications>\` command!')
            if(!data.d_channel_id) return message.channel.send('You can\'t **disable** Twitch Notifications before set a discord channel: \`l!twitch channel <#examplechannel>\` command!')

            data.enabled = false;

            await Tags.update({twitch_data: data}, {where: {guild_id: message.guild.id}})
            return message.channel.send(`Twitch live notifications **disabled** for <#${data.d_channel_id}>`)
        } else if(args[0]){

            fetch(`https://api.twitch.tv/helix/search/channels?query=${args[0]}&first=1`, {
                method: "GET",
                headers: {"client-id": TWITCH_CLIENT_ID,"Authorization": `Bearer ${TWITCH_TOKEN}`}
            }).then(response => response.json().then(async res => {
                if(!res.data) return message.channel.send(`There is no channel results for \`${args[0]}\` on Twitch!`)
                
                data.t_channel_name = res.data[0].broadcaster_login;

                await Tags.update({twitch_data: data}, {where: {guild_id: message.guild.id}})
                return message.channel.send(`Twitch user saved!`)
            })).catch(() => {
                return message.channel.send(`There is no channel results for \`${args[0]}\` on Twitch!`)
            })


        } else {
            return message.channel.send('Twitch command menu!')
        }
    }
}