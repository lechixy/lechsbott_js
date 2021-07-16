module.exports = {
    name: 'rr',
    aliases: ['rrhelp'],
    cooldown: 0,
    description: "This is reaction role command!",
    async execute(client, message, args, cmd, Discord) {
        if(cmd === 'rr'){
            let channel = message.mentions.channels.first();
        if(!channel){
            return message.channel.send(`Sorry you need to tag a channel for example: **#example-channel**`)
        }
        let aeRole = message.guild.roles.cache.find(role => role.name === "after effects");
        let valRole = message.guild.roles.cache.find(role => role.name === "valorant");
 
        let aeEmoji = '💜';
        let valEmoji = '❤';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setAuthor(name="Choose a role what u want!", icon_url="http://images6.fanpop.com/image/photos/43700000/Wanda-WandaVision-1-06-All-New-Halloween-Spooktacular-wandavision-43797661-1440-1440.jpg")
            .setTitle('')
            .setDescription('Your choosed role will effect color of your name!\n\n'
                + `${aeEmoji} for after effects\n`
                + `${valEmoji} for valorant`);
 
        let messageEmbed = await channel.send(embed);
        messageEmbed.react(aeEmoji);
        messageEmbed.react(valEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === aeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(aeRole);
                }
                if (reaction.emoji.name === valEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(valRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === aeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(aeRole);
                }
                if (reaction.emoji.name === valEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(valRole);
                }
            } else {
                return;
            }
        });
        }
        // else if(cmd === 'rrhelp'){
        //     let botpp = client.user.displayAvatarURL()
        //     let helpembed = new Discord.MessageEmbed()
        //     .setAuthor(`lechsbott • reaction role setup`, botpp)
        //     .addField(`l!rrsetup <#example-channel>  `, `Send a reaction role embed message to defined channel...`)
        // }
    }
}
    