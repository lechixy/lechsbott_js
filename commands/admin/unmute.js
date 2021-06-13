module.exports = {
    name: 'unmute',
    aliases: ['konuş', 'susturma'],
    cooldown: 0,
    description: "This unmutes a member",
    execute(client, message, args){
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === "'");
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
            let memberTarget= message.guild.members.cache.get(target.id);
 
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`**<@${memberTarget.user.id}> has been unmuted!**`);
        } else{
            message.channel.send("**Can't ban** that member!");
        }
    }
}