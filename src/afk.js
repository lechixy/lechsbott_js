const db = require('../models/afkSchema');
const moment = require('moment')

function afkCheck(message){
    try {
        db.findOne({ Guild: message.guild.id, Member: message.author.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.delete()

            return message.channel.send({ content: `<@${message.author.id}> welcome back, i removed your afk!` })
        } else return;
            
        if (message.mentions.members.first()) {
        db.findOne({ Guild: message.guild.id, Member: message.mentions.members.first().id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                const member = message.guild.members.cache.get(data.Member);

                return message.channel.send({ content: `<@${member.user.id}> is now afk: ${data.Content} ${moment(parseInt(data.TimeAgo)).fromNow()}` })
            } else return;
        })
    }
    })
    } catch(err){
        console.log(err)
    }


}

exports.afkCheck = afkCheck
