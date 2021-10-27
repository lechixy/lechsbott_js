const { MessageEmbed } = require('discord.js');
const db = require('../../models/afkSchema');
const moment = require('moment')

module.exports = {
    name: 'afk',
    description:'Sets your status to afk!',
    category: ['Utility'],
    arguments: `<Status | none>`,
    async execute(client, message, args, cmd, Discord) {
        const afkreason = args.slice(0).join(' ') || 'AFK';

        db.findOne({ Guild: message.guild.id, Member: message.author.id }, async (err, data) => {
            if (!data) {
                let Data = new db({
                    Guild: message.guild.id,
                    Member: message.author.id,
                    Content: afkreason,
                    TimeAgo: Date.now()
                })
                Data.save()

                message.channel.send({ content: `<@${message.author.id}> setted your status: ${afkreason}` })
            } else {
                return
            }
        })
    }
}