module.exports = {
    name: 'instagram',
    aliases: [ 'ig', 'igprofile', 'instagramprofile'],
    cooldown: 0,
    description: 'stop the bot and leave the channel',
    async execute(client, message, args, cmd, Discord){

        let work = 'true';

        if(work === 'true'){
            return message.channel.send('Command was disabled!')
        }


        const userInstagram = require("user-instagram");

        let ig = userInstagram("lechixy")

        let profile = {};

        // const iguser = args[0]

        // const finder = userInstagram(iguser)

        profile = {
            link: ig.link,
            name: ig.fullName,
            bio: ig.biography,
        }

        let userembed = new Discord.MessageEmbed()
        .setTitle(`Instagram Profile Of ${profile.name}`)
        .setURL(profile.link)
        .setDescription(profile.bio)
        .setTimestamp()
        message.channel.send(userembed)
    }
}