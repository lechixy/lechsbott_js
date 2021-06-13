module.exports = {
    name: 'instagram',
    aliases: [ 'ig', 'igprofile', 'instagramprofile'],
    cooldown: 0,
    description: 'stop the bot and leave the channel',
    async execute(client, message, args, cmd, Discord){
        const userInstagram = require("user-instagram");
        let instagram = {};

        let ig = await userInstagram("frostyfalc")

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
            post1: ig.posts.url,
            post1caption: ig.posts.caption,
        }
        
        if(instagram.private === 'true') {
            let privateembed = new Discord.MessageEmbed()
            .setAuthor(instagram.username, instagram.profilepic, instagram.link)
            .setTitle(`${instagram.user}`)
            .setDescription(instagram.bio)
            .addField('Posts', instagram.postsCount, true)
            .addField('Followers', instagram.followers, true)
            .addField('Following', instagram.follows, true)
            .addField('\u200B', '\u200B')
            .addField(`We can't show you to **${username}'s** posts!`, `Because this profile is **private**`, true)
            .setTimestamp()
            message.channel.send(privateembed)
        } else {
            let userembed = new Discord.MessageEmbed()
            .setAuthor(instagram.username, instagram.profilepic, instagram.link)
            .setTitle(`${instagram.user}`)
            .setDescription(instagram.bio)
            .addField('Posts', instagram.postsCount, true)
            .addField('Followers', instagram.followers, true)
            .addField('Following', instagram.follows, true)
            .addField('\u200B', '\u200B')
            .addField(`Post`, `[\`${instagram.post1caption}\`](${instagram.post1})`, true)
            .setTimestamp()
            const m = await message.channel.send(userembed);

            if (userembed.field.length >= 30)
            userembed.field = `${userembed.field.substr(0, 30)}...`;
            return m.edit(userembed)
        }   
    }
}