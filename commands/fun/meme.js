const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    aliases: ['redditmeme'],
    cooldown: 3,
    description: '',
    async execute(client, message, args, cmd, Discord) {

        const Reds = [
            "memes",
            "me_irl",
            "dankmemes",
            "Animemes",
            "AdviceAnimals",
            "MemeEconomy",
            "ComedyCemetery"

        ];
        const Rads = Reds[Math.floor(Math.random() * Reds.length)];

        function getMeme(){
            fetch(`https://reddit.com/r/${Rads}/random/.json`).then(async resp => {
            const json = await resp.json();
            
            if(json[0].data.children[0].data.is_video === true){
                return getMeme()
            }

            try {
                let permalink = json[0].data.children[0].data.permalink;
                let title = json[0].data.children[0].data.title;
                let titleURL = `https://reddit.com${permalink}`
                let meme = json[0].data.children[0].data.url;
                let ups = json[0].data.children[0].data.ups;
                let comments = json[0].data.children[0].data.num_comments;
                let from = json[0].data.children[0].data.subreddit_name_prefixed;

                if(ups < 20){
                    return getMeme()
                }
    
                const embed = new Discord.MessageEmbed()
                .setTitle(title)
                .setURL(titleURL)
                .setColor('RANDOM')
                .setImage(meme)
                .setFooter(`👍 ${ups} 💬 ${comments} • ${from}`)
                message.channel.send({ embeds: [embed] });
            } catch (err) {
                console.log(err);
            }

        })
        }

        getMeme()
        
    }
}