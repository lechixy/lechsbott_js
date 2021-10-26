const { PREFIX } = require(`../util/lechsbottUtil`)
const moment = require(`moment`);
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: `topoldest`,
    aliases: [`oldests`],
    description: 'Gets top 10 oldest members of server!',
    category: ['Utility'],
    arguments: `<none>`,
    async execute(client, message, args, cmd, Discord) {



        let mem = message.guild.members.cache.filter(m => !m.user.bot).sort((a, b) => a.user.createdAt - b.user.createdAt).first(10)
        let results = []

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Oldest 10 members in ${message.guild.name}`, message.guild.iconURL({dynamic: true}))
            .setColor(roleColor(message))

        mem.map((value, index) => {
            embed.addField(`${index + 1} | ${value.user.tag}`, `*${moment(value.user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')} (${moment(value.user.createdAt).fromNow()})*`)
        })

        message.channel.send({ embeds: [embed] })


    }
}
