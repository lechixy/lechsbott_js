module.exports = {
    name: 'afk',
    aliases: ['afk', 'nowafk', 'removeafk', 'nowonline'],
    description: '',
    async execute(client, message, args, cmd, Discord) {
        //need fix
        let clientmember = message.guild.members.cache.get(client.user.id)
        if(!clientmember.hasPermission('MANAGE_NICKNAMES')){
            let mispermesembed = new Discord.MessageEmbed()
            .setDescription(`Need to add \`Manage Nicknames\` permission to <@${client.user.id}> for change username!`)
            .setImage('https://cdn.discordapp.com/attachments/850074093456850965/854367253142569001/unknown.png')
            return message.channel.send(mispermesembed)
        }

        let afkmember = message.mentions.users.first() || message.author
        let member = message.guild.members.cache.get(afkmember.id)
        let normalname = afkmember.username

        if(cmd === 'afk') {
            member.setNickname(`${normalname} (AFK)`)
            let changedembed = new Discord.MessageEmbed()
            .setDescription(`Setted ${afkmember}'s status from **online** to **afk!**`)
            return message.channel.send(changedembed)
        } else if(cmd === 'nowafk') {
            member.setNickname(`${normalname} (AFK)`)
            let changedembed = new Discord.MessageEmbed()
            .setDescription(`Setted ${afkmember}'s status from **online** to **afk!**`)
            return message.channel.send(changedembed)
        } else if(cmd === 'removeafk') {
            member.setNickname(normalname)
            let removedembed = new Discord.MessageEmbed()
            .setDescription(`Setted ${afkmember}'s status from **afk** to **online!**`)
            return message.channel.send(removedembed)
        } else if(cmd === 'nowonline') {
            member.setNickname(normalname)
            let removedembed = new Discord.MessageEmbed()
            .setDescription(`Setted ${afkmember}'s status from **afk** to **online!**`)
            return message.channel.send(removedembed)
        }
    }
}