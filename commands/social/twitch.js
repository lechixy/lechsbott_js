const { PREFIX, TWITCH_TOKEN, TWITCH_CLIENT_ID } = require('../util/lechsbottUtil')
const fetch = require('node-fetch')

module.exports = {
    name: 'twitch',
    description: 'Search streamers in Twitch!',
    category: ['Utility'],
    arguments: `<streamer name | query>`,
    async execute(client, message, args, cmd, Discord) {

        const twemoji = client.emojis.cache.get('875869941788713010');

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setDescription(`${twemoji} **What want you search on Twitch?**`)
                .addField(`Usage`, `${PREFIX}${cmd} <streamer>`, true)
            return message.channel.send({ embeds: [embed] });
        }

        const newurl = `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(args[0])}&first=1`
        const url = `https://api.twitch.tv/helix/search/channels?query=${encodeURIComponent(args[0])}&first=1`

        fetch(url, {
            method: 'GET',
            headers: { "client-id": TWITCH_CLIENT_ID, "Authorization": `Bearer ${TWITCH_TOKEN}` }
        }).then(response => response.json().then(res => {

            if (!res.data.length) {
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**No streamers found within** \`${args[0]}\` **on Twitch!**`)
                return message.channel.send({ embeds: [embed] });
            }

            fetch(newurl, {
                method: 'GET',
                headers: { "client-id": TWITCH_CLIENT_ID, "Authorization": `Bearer ${TWITCH_TOKEN}` }
            }).then(respo => respo.json().then(twitch => {

                if (res.error) {
                    console.log(res)
                    
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`**There was an error while Twitch, please try later!**`)
                    return message.channel.send({ embeds: [embed] });
                }

                if (res.data[0].is_live === true) {

                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`${twitch.data[0].user_login}`, res.data[0].thumbnail_url, `https://www.twitch.tv/${res.data[0].broadcaster_login}`)
                        .setTitle(`${twitch.data[0].title}`)
                        .setThumbnail(res.data[0].thumbnail_url)
                        .setURL(`https://www.twitch.tv/${twitch.data[0].user_login}`)
                        .setColor('#6441a5')
                        //colum
                        .addField(`Game`, `[${twitch.data[0].game_name}](https://www.twitch.tv/directory/game/${encodeURIComponent(twitch.data[0].game_name)})`, true)
                        .addField(`Viewers`, `${twitch.data[0].viewer_count}`, true)
                        .addField(`Currently`, `<:live:850474685954523137> **Live Now**`, true)
                        .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${twitch.data[0].user_login}-1280x720.jpg`)
                    return message.channel.send({ embeds: [embed] });

                }

                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${res.data[0].broadcaster_login}`, res.data[0].thumbnail_url, `https://www.twitch.tv/${res.data[0].broadcaster_login}`)
                    .setTitle(`About Last Stream`)
                    .setThumbnail(res.data[0].thumbnail_url)
                    .setColor('#6441a5')
                    //colum
                    .addField(`Title`, `[${res.data[0].title}](https://www.twitch.tv/${res.data[0].broadcaster_login})`, true)
                    .addField(`Game`, `[${res.data[0].game_name}](https://www.twitch.tv/directory/game/${encodeURIComponent(res.data[0].game_name)})`, true)
                    .addField(`Currently`, `<:offline:875400047234273330> **Offline**`, true)
                    .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${res.data[0].user_login}-1280x720.jpg`)
                return message.channel.send({ embeds: [embed] });


            }))
        }))




    }
}