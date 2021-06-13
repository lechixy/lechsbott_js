module.exports = {
    name: "deneme",
    description: "welcome to the lab",
    async execute(client, message, args, cmd, Discord) {
        let userembed = new Discord.MessageEmbed()
            .setAuthor(name = `lechixy`, icon_url = 'https://instagram.fesb4-2.fna.fbcdn.net/v/t51.2885-19/s320x320/196961452_2935303240075114_1595244597934291916_n.jpg?tp=1&_nc_ht=instagram.fesb4-2.fna.fbcdn.net&_nc_ohc=XUHQakS2z0kAX8rzu9D&edm=ABfd0MgBAAAA&ccb=7-4&oh=60adf825efacc319f8cf0ebbcbcd905b&oe=60C69167&_nc_sid=7bff83', url = 'https://instagram.com/lechixy')
            .setTitle('melih🦋')
            .setThumbnail('https://instagram.fesb4-2.fna.fbcdn.net/v/t51.2885-19/s320x320/196961452_2935303240075114_1595244597934291916_n.jpg?tp=1&_nc_ht=instagram.fesb4-2.fna.fbcdn.net&_nc_ohc=XUHQakS2z0kAX8rzu9D&edm=ABfd0MgBAAAA&ccb=7-4&oh=60adf825efacc319f8cf0ebbcbcd905b&oe=60C69167&_nc_sid=7bff83')
            .setDescription('saruu\n~\nmore than a editor?')
            .addField('Posts', '46', true)
            .addField('Followers', '524', true)
            .addField('Following', '1415', true)
            .addField('\u200B', '\u200B')
            .addField(`a positive edit <3\n.\n.\n#edit #aftereffects`, `[\`for post click\`](https://www.instagram.com/p/CNqPLQIKqaW/)`, true)
            .addField(`wandavision❤️ edit not finished yet :)`, `[\`for post click\`](https://www.instagram.com/p/CL2fZmfKwiS/)`, true)
            .addField(`Doctor Strange❤️✨`, `[\`for post click\`](https://www.instagram.com/p/CIS4T45ngqz/)`, true)
            .setTimestamp()
            message.channel.send(userembed);
    }
}