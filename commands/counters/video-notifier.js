const ytpl = require('ytpl');
const serverModel = require('../../models/serverSchema')

function videoNotifier(client, Discord){

    let serverid = '840543133007609907'
    let channelid = '871163698507546724'

    // setInterval(function(){
        async function infoget(url){
            const song_info = await ytpl(url);

            try {
                let dbserver = await serverModel.findOne({ serverId: serverid })
        
                if(!dbserver){
                    let server = await serverModel.create({
                        serverId: serverid,
                        channelId: channelid,
                        lastVidUrl: song_info.items[0].shortUrl,
                        notifymessage: null,
                    })
                    server.save();
                }
            } catch(e){
                console.log(e)
            }
            
            let lasturl = await serverModel.findOne({ serverId: serverid })
            let currenturl = song_info.items[0].shortUrl

            if(lasturl.lastVidUrl === currenturl) {
                return
            } else {
                console.log(song_info.items[0])
                await serverModel.findOneAndUpdate(
                    { serverId: serverid}, 
                    { $set: { lastVidUrl: currenturl, notifymessage: `@everyone **${song_info.author.name}** yeni bir video paylaştı! ${currenturl}`, } }
                    )

                let sendreq = await serverModel.findOne({ serverId: serverid })
                let guild = client.guilds.cache.get(sendreq.serverId)
                let channel = guild.channels.cache.get(sendreq.channelId)

                channel.send({ content: `${sendreq.notifymessage}` });
            }

        }

        infoget('https://www.youtube.com/channel/UCXLeaos7kavKgRRYkqrg-ng')
    // }, )
    
}

exports.videoNotifier = videoNotifier;