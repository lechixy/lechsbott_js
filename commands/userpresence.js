module.exports = {
    name: 'userpresence',
    aliases: ['status', 'durum'],
    cooldown: 0,
    description: 'broadcast a player presence status!',
    async execute(client, message, args, cmd, Discord){

        let work = 'true';

        if(work === 'true'){
            return message.channel.send('Command was disabled!')
        }

        let member = message.mentions.users.first() || message.author

        console.log(member.user.presence);
    }
}
