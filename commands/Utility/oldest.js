const { PREFIX } = require(`../util/lechsbottUtil`)
const { roleColor } = require('../util/lechsbottFunctions')
const moment = require(`moment`);

module.exports = {
    name: `oldest`,
    description: 'Gets oldest member of server!',
    category: ['Utility'],
    arguments: `<none>`,
    async execute(client, message, args, cmd, Discord) {


        let mem = message.guild.members.cache.filter(m => !m.user.bot).sort((a, b) => a.user.createdAt - b.user.createdAt).first()

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Oldest member in ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setColor(roleColor(message))
            .addField(`${mem.user.tag}`, `*${moment(mem.user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')} (${moment(mem.user.createdAt).fromNow()})*`)
        message.channel.send({ embeds: [embed] })
    }
}
