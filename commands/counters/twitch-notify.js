const { PREFIX, TWITCH_TOKEN, TWITCH_CLIENT_ID } = require('../util/lechsbottUtil')
const fetch = require('node-fetch')
const server = new Map()

module.exports = async (client, Discord) => {

    function check(streamer) {
        setInterval(() => {
        const guild = client.guilds.cache.get('840543133007609907');
        const channel = client.channels.cache.get('875752853082361876')
        const newurl = `https://api.twitch.tv/helix/streams?user_login=${streamer}&first=1`

        if (!guild || !channel) {
            return console.log('no channel or guild')
        }

        fetch(newurl, {
            method: 'GET',
            headers: { "client-id": TWITCH_CLIENT_ID, "Authorization": `Bearer ${TWITCH_TOKEN}` }
        }).then(respo => respo.json().then(twitch => {

            if (!twitch.data.length) {
                return
            }

            const serverget = server.get('840543133007609907')

            if (!serverget) {

                server.set('840543133007609907', twitch.data[0].started_at)

                const url = `https://api.twitch.tv/helix/search/channels?query=${streamer}&first=1`

                fetch(url, {
                    method: 'GET',
                    headers: { "client-id": TWITCH_CLIENT_ID, "Authorization": `Bearer ${TWITCH_TOKEN}` }
                }).then(response => response.json().then(res => {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`${twitch.data[0].user_login}`, res.data[0].thumbnail_url)
                        .setTitle(`${twitch.data[0].title}`)
                        .setThumbnail(res.data[0].thumbnail_url)
                        .setURL(`https://www.twitch.tv/${twitch.data[0].broadcaster_login}`)
                        .setColor('#6441a5')
                        //colum
                        .addField(`Game`, `${twitch.data[0].game_name}`, true)
                        .addField(`Viewers`, `${twitch.data[0].viewer_count}`, true)
                        .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${twitch.data[0].user_login}-1280x720.jpg`)
                    return channel.send({ content: `Elraenn is now live on Twitch! @everyone `, embeds: [embed] });
                }))
            } else {
                return
            }
        }))}, 300000)
    }

    check('elraenn')
}