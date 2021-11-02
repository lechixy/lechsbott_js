const { PREFIX } = require('../util/lechsbottUtil')
const { converToCode, roleColor } = require('../util/lechsbottFunctions')
const prefixSchema = require('../../models/saidPrefix')
const moment = require('moment')

module.exports = {
    name: 'stats',
    description: 'Get lechsbott global stats!',
    category: ['lechsbott'],
    arguments: `<none>`,
    async execute(client, message, args, cmd, Discord) {


        const b = await prefixSchema.find({})

        let totalsaids = 0
        b.forEach(xy => {
            return totalsaids += xy.timeSaid
        })

        const readyOn = moment(client.readyAt).format('dddd, MMMM Do YYYY, h:mm:ss a');

        let totalmembers = 0
        client.guilds.cache.each(guild => totalmembers += guild.memberCount)

        let first = `md\n<userID: ${message.author.id}>\n<channelID: ${message.channel.id}>\n<guildID: ${message.guild.id}>`
        let second = `md\n<totalSaid: ${totalsaids}>\n<lechsUsers: ${b.length}>`
        let third = `md\n<Guilds: ${client.guilds.cache.size}>\n<Channels: ${client.channels.cache.size}>\n<Users: ${totalmembers}>`
        let fourth = `md\n<Ping: ${Date.now() - message.createdTimestamp}ms>\n<LastUpdated: ${readyOn}>\n<Uptime: ${client.uptime}>`

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Global Stats`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`How many numbers are there? Need to help about bot use \`${PREFIX}help\``)
            .addField(`This Guild`, `${converToCode(first)}`)
            .addField(`Global information`, `${converToCode(second)}`)
            .addField(`Bot information`, `${converToCode(third)}${converToCode(fourth)}`)
            .setTimestamp()
            .setColor(roleColor(message))
        message.channel.send({ embeds: [embed] });

    }
}