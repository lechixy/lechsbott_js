module.exports = {
    name: 'ban',
    aliases: ['engelle'],
    cooldown: 0,
    description: "This command bans a member!",
    execute(client, message, args) {
        const cross = client.emojis.cache.get("846030611486474280");
        const member = message.mentions.users.first();
        const ban = client.emojis.cache.get("846030610954584064");

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You can\'t use that!')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the right permissions.')

        if(!args[0]) return message.channel.send('Please tag a user you want to ban \`l!ban @Discord#0001 <optional: reason>\`');

        if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t ban yourself!');

        if(!member.bannable) return message.channel.send(`${cross} This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine!`);

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        if(member){
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.ban();
            const banembed = new Discord.MessageEmbed()
            .setTitle('Member Banned')
            .setThumbnail(member.user.displayAvatarURL())
            .addField('User Banned', member)
            .addField('Kicked by', message.author)
            .addField('Reason', reason)
            .setFooter('Time kicked')
            .setTimestamp()

            message.channel.send(banembed);
            
        } else {
            
            message.channel.send(`${cross} You couldn't ban that member!`)
        
        }
    }
}