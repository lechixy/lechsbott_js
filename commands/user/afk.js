const { MessageEmbed } = require('discord.js');
const db = require('../../models/afkSchema');
const moment = require('moment')

module.exports = {
    name: 'afk',
    async execute(client, message, args, cmd, Discord) {
        const afkreason = args.slice(0).join(' ') || 'No reason';

        db.findOne({ Guild: message.guild.id, Member: message.author.id }, async (err, data) => {
            if (data) {
                data.delete()

                return message.channel.send({ content: `<@${message.author.id}> welcome back, i removed your afk!` })
            } else {
                Data = new db({
                    Guild: message.guild.id,
                    Member: message.author.id,
                    Content: afkreason,
                    TimeAgo: Date.now()
                })
                Data.save()

                message.channel.send({ content: `<@${message.author.id}> setted your status to afk: ${afkreason}` })
            }
        })
    }
}