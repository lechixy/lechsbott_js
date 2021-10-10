const { PREFIX } = require('../util/lechsbottUtil')
const moment = require("moment")
const progressbar = require('string-progressbar');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    description: '',
    async execute(client, message, args, cmd, Discord) {

        const queue = client.queue
        const server_queue = queue.get(message.guild.id)

        if (!server_queue) {
            const embed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setAuthor(`There is nothing playing on this server`, message.author.displayAvatarURL({ dynamic: true }))
            return message.channel.send({ embeds: [embed] });
        }

        const songduration = server_queue.resource.playbackDuration
        const totaltime = server_queue.songs[0].duration.toString()

        let elapsedtime

        if (totaltime.length >= 7) {
            elapsedtime = `${formatTime(moment.duration(songduration).hours())}:${formatTime(moment.duration(songduration).minutes())}:${formatTime(moment.duration(songduration).seconds())}`
        } else {
            elapsedtime = `${moment.duration(songduration).minutes()}:${formatTime(moment.duration(songduration).seconds())}`
        }


        function timeConverter(timestamp) {
            const split = timestamp.split(':')

            if (split.length > 2) {

                let [hour, minute, second] = split;

                return hour * 3600 + minute * 60 + second * 1
            } else {

                let [minute, second] = split;

                return (minute * 60 + second * 1)

            }
        }

        const bar = progressbar.splitBar(timeConverter(totaltime), timeConverter(elapsedtime), 25, '▬', ':blue_circle:').toString()


        function splitbar(bar) {
            const split = bar.split(',');

            let [part] = split;

            return part
        }

        let nowplayingembed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setTitle(`${server_queue.songs[0].title}`)
            .setURL(server_queue.songs[0].customurl)
            .setDescription(`<@${server_queue.songs[0].addedid}> added from **${server_queue.songs[0].app}**\n
            ${elapsedtime}<:transparent:890623794421592104>${splitbar(bar)}<:transparent:890623794421592104>${totaltime}`)
        message.channel.send({ embeds: [nowplayingembed] })


    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}