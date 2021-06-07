const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: "meme",
    description: "Gives you a meme",
    aliases: ["dankmeme"],
    cooldown: 0,
    async execute (client, message, args, cmd, Discord) { 
        const subReddits = ["dankmemes", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
  
        const img = await randomPuppy(random);
  
        const memeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`From r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)
        .setColor("0xff0000")
        .setFooter('lechsbot')
        .setTimestamp()
        message.channel.send(memeEmbed);
    }
}