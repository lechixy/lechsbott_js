const db = require('../../models/saidPrefix')
const moment = require('moment')

module.exports = {
    name: 'saidtimes',
    aliases: ['timessaid', 'said', 'saidprefix'],
    description: '',
    category: ['User'],
    async execute(client, message, args, cmd, Discord) {

        let user
        if (message.mentions.members.first()) {
            user = message.mentions.members.first()
        } else if (args[0]) {
            user = await message.guild.members.cache.get(args[0])
        } else {
            user = message.member
        }

        try {
            db.findOne({ userID: user.user.id }, async (err, data) => {
                if(!data){
                    return message.channel.send({ content: 'This user has **never used lechsbott** so **used lechsbott for 0 times**' });
                }
        
                let sended = `**${data.userTag}** used lechsbott for **${data.timeSaid.toLocaleString()}** times and last used **${moment(parseInt(data.lastSaid)).fromNow()}**`
                message.channel.send({ content: sended })
            })
        } catch (err) {
            console.log(err)
        }
        

    }
}