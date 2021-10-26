const { PREFIX } = require('../util/lechsbottUtil')
const ytSearch = require('yt-search')

module.exports = {
    name:'youtube',
    description:'Searches videos on YouTube!',
    category: ['Utility'],
    arguments: `<keywords to search | video title>`,
    async execute(client, message, args, cmd, Discord) {

        const ytemoji = client.emojis.cache.get('846030610526634005');

        if(!args[0]){
            const embed = new Discord.MessageEmbed()
            .setDescription(`${ytemoji} **What want you search on YouTube?**`)
            .addField(`Usage`, `${PREFIX}${cmd} <video title>`, true)
            return message.channel.send({ embeds: [embed] });
        }

        const video_finder = async (query) => {
            const video_result = await ytSearch(query);
            return video_result.videos.length > 1 ? video_result.videos[0] : null;
        };

        const video = await video_finder(args.join(' '));
        if (video) {
            message.channel.send(video.url)
        } else {
            const embed = new Discord.MessageEmbed().setDescription(
                `**No videos found within** \`${args.join(' ')}\` **on YouTube!**`
            );
            return message.channel.send({ embeds: [embed] });
        }
        
        
  }
}