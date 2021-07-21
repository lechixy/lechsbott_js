module.exports = {
    name: 'instagram',
    aliases: [ 'ig', 'igprofile', 'instagramprofile'],
    cooldown: 0,
    description: 'stop the bot and leave the channel',
    async execute(client, message, args, cmd, Discord){
        const userInstagram = require("user-instagram");
        let instagram = {};

        let ig = await userInstagram(args[0])
        console.log(ig)
        instagram = {
            user: ig.fullName,
            link: ig.link,
            bio: ig.biography,
            followers: ig.subscribersCount,
            follows: ig.subscribtions,
            username: ig.username,
            profilepic: ig.profilePicHD,
            postcount: ig.postsCount,
            private: ig.isPrivate,
            verified: ig.isVerified,
            
        }
        
        if(instagram.verified === true) {
            let privateembed = new Discord.MessageEmbed()
            .setAuthor(`<:verified:854855721871343637> ${instagram.username}`, instagram.profilepic, instagram.link)
            .setTitle(`${instagram.user}`)
            .setImage(instagram.profilepic)
            .setDescription(instagram.bio)
            .addField('Posts', instagram.postcount, true)
            .addField('Followers', instagram.followers, true)
            .addField('Following', instagram.follows, true)
            .addField('\u200B', '\u200B')
            .addField(`We can't show you to **${username}'s** posts!`, `Because this profile is **private**`, true)
            .setTimestamp()
            message.channel.send(privateembed)
        } else {
            let userembed = new Discord.MessageEmbed()
            .setAuthor(`<:verified:854855721871343637> ${instagram.username}`, instagram.profilepic, instagram.link)
            .setTitle(`${instagram.user}`)
            .setImage(instagram.profilepic)
            .setDescription(instagram.bio)
            .addField('Posts', instagram.postcount, true)
            .addField('Followers', instagram.followers, true)
            .addField('Following', instagram.follows, true)
            .addField('\u200B', '\u200B')
            .addField(`${args[0]} on Instagram`, `[\`${instagram.username}\`](${instagram.url})`, true)
            .setTimestamp()
            await message.channel.send(userembed);
        }   
    }
}