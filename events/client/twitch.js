module.exports = (Discord, client, Tags) => {
    const fetch = require("node-fetch")
    const { TWITCH_TOKEN, TWITCH_CLIENT_ID} = require("../../commands/util/lechsbottUtil")

    // setTimeout(() => {

        client.guilds.cache.forEach(async guild => {

            const tag = await Tags.findOne({where: {guild_id: guild.id}})
            const data = tag.get("twitch_data");
            
    
            if(data.enabled){
                fetch(`https://api.twitch.tv/helix/streams?user_login=${data.t_channel_name}`,{
                    method: "GET",
                    headers: {"client-id": TWITCH_CLIENT_ID,"Authorization": `Bearer ${TWITCH_TOKEN}`}
                }).then(response => response.json().then(res => {
                    console.log(res);
                }))
            }
        })




    // })
}