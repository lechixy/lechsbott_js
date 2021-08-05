module.exports = {
    name: 'userpresence',
    aliases: ['status', 'durum'],
    cooldown: 0,
    description: 'broadcast a player presence status!',
    async execute(client, message, args, cmd, Discord){

        let member = message.mentions.users.first() || message.author

        console.log(member.user.presence);
    }
}
