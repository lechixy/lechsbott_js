module.exports = {
    name: 'unban',
    aliases: ['affet', 'pardon'],
    cooldown: 0,
    description: "This command unbans a member!",
    execute(client, message, args, Discord) {
        const bannedmember = message.mentions.users.first();
        const ban = client.emojis.cache.get("846030610954584064");

        if(bannedmember){
            const memberTarger = message.guild.members.cache.get(bannedmember.id);
            memberTarger.unban();
            message.channel.send(`${ban} **User has been unbanned!**`)
        } else {
            message.channel.send(`${ban} **You cannot unban that member!**`)
        }
    }
}