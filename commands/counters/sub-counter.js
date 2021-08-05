module.exports = (client, Discord) => {
    const ytdl = require('ytdl-core')
    
    const guild = client.guilds.cache.get('796446524175286272');

    async function search(url){
        const video = await ytdl.getInfo(url)

        const channel = guild.channels.cache.get('872950212438667334');
        channel.setName(`Abone Sayısı • ${video.videoDetails.author.subscriber_count.toString()}`);
        console.log('Updated')
        
    }
    setInterval(() =>{
        search('https://www.youtube.com/watch?v=uFwVZeTspNE')
    }, 600000);
}
