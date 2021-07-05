const Discord = require("discord.js");

module.exports = {
    name: 'emojis',
    aliases: ['emotes', 'emoji', 'emojiler'],
    description: 'How much emoji u want!',
    cooldown: 0,
    async execute (client, message, args, cmd, Discord) {
        let animEmotes = [],
        staticEmotes = [];
        var guild = message.guild

        guild.emojis.cache.forEach((e) => {
            e.animated ? animEmotes.push(`<a:${e.name}:${e.id}>`) : staticEmotes.push(`<:${e.name}:${e.id}>`);
        });
        staticEmotes = staticEmotes.length !== 0 ? `\`[${staticEmotes.length}] Custom Emoji\`\n${staticEmotes.join('')}` : '\nThis server does not contain emojis';
        animEmotes = animEmotes.length !== 0 ? `\n\n\`[${animEmotes.length}] Animated Emoji\`\n${animEmotes.join('')}` : '\nThis server does not contain animated emojis';
        
        try {     
        let botembed = new Discord.MessageEmbed()
        .setDescription(staticEmotes + animEmotes)
        .setAuthor(`${message.guild.name}'s Emotes`, message.guild.iconURL())
        .setTimestamp()
        const m = message.channel.send(botembed)

        if (botembed.description.length >= 2047)
        botembed.description = `${botembed.description.substr(0, 2044)}...`;
        return m.edit(botembed)
    } catch (err) {
        const embed = new Discord.MessageEmbed()
        .addField(`Emotes in that server`, 'Sorry but either this server contains more emojis i can read or there are no emojis. I cannot show it because discord doesn\'t allow.')
        .setTimestamp()
        message.channel.send(embed)               
      }
  }
}
