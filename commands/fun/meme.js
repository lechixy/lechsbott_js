const got = require('got');

module.exports = {
    name:'meme',
    aliases:['redditmeme'],
    cooldown: 5,
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        got('https://reddit.com/r/meme/random/.json').then(res => {
            let content = JSON.parse(res.body);

            let permalink = content[0].data.children[0].data.permalink;
            let title = content[0].data.children[0].data.title;
            let titleURL = `https://reddit.com${permalink}`
            let meme = content[0].data.children[0].data.url;
            let ups = content[0].data.children[0].data.ups;
            let downs = content[0].data.children[0].data.downs;
            let comments = content[0].data.children[0].data.num_comments;
            let from = content[0].data.children[0].data.subreddit_name_prefixed;

            const embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setURL(titleURL)
            .setAuthor(from)
            .setColor('RANDOM')
            .setImage(meme)
            .setFooter(`👍 ${ups} 💬 ${comments}`)
            message.channel.send({ embeds: [embed] });
        })
        
        
  }
}