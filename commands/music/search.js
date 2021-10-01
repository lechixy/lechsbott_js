const { PREFIX } = require('../util/lechsbottUtil')
const { handleResource } = require('./utils')
const ytSearch = require('yt-search')
const Voice = require('@discordjs/voice')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: 'search',
    aliases: ['srch'],
    description: '',
    async execute(client, message, args, cmd, Discord) {

        const voice_channel = message.member.voice;

        if (!voice_channel) {
            let voiceembed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setAuthor(
                    `You need to be in a voice channel for play a music!`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
            return message.channel.send({ embeds: [voiceembed] });
        }

        const queue = client.queue
        const server_queue = queue.get(message.guild.id)
        let player = Voice.joinVoiceChannel({
            channelId: voice_channel.channel.id,
            guildId: voice_channel.channel.guild.id,
            adapterCreator: voice_channel.channel.guild.voiceAdapterCreator,
            selfDeaf: true,
        });

        if (server_queue) {

            //resfresh text channel
            server_queue.text_channel = message.channel

            if (voiceChannel.channel.id !== server_queue.voice_channel.id) {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setAuthor(`There is currently playing a song on another voice channel`, message.author.displayAvatarURL({ dynamic: true }))
                return message.channel.send({ embeds: [embed] });
            }
        }

        if (!args[0]) {
            let argsembed = new Discord.MessageEmbed()
                .setColor(roleColor(message))
                .setAuthor(
                    `l!${cmd} [query]`,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .addField(`youtube`, `search videos in`, true)
            return message.channel.send({ embeds: [argsembed] });
        }

        const m = await message.channel.send({ content: `<:youtube:846030610526634005> **Searching for** \`${args.join(' ')}\`` });

        const video = await ytSearch(args.join(' '));
        const videos = video.videos.slice(0, 10)
        let index = 0;

        let string1 = "";

        string1 += `${videos.map(x => `**${++index}-** ${x.title}`).join("\n")}`;

        let searchresult = new Discord.MessageEmbed()
            .setTitle(`Search results for ${args.join(' ')}`)
            .setColor(roleColor(message))
            .setDescription(string1)
            .addField('Choose one of them', 'Just type the number one of results you wanted to play, for cancel you can type \`cancel\`')
        m.edit({ embeds: [searchresult] });

        const filter = (m) => {
            return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'cancel'].includes(m.content) && m.author.id === message.author.id
        }
        message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .then(async responde => {

                const collected = responde.first()
                if(['cancel'].includes(collected.content)){
                    let embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setAuthor(
                        `Cancelled from search`,
                        message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setDescription(`You quitted from youtube search, next time :)`)
                return message.channel.send({ embeds: [embed] });
                }

                let numbers = {
                    '1': 0,
                    '2': 1,
                    '3': 2,
                    '4': 3,
                    '5': 4,
                    '6': 5,
                    '7': 6,
                    '8': 7,
                    '9': 8,
                    '10': 9,
                }
                
                async function findSong(collect) {
                    const video = await ytSearch(args.join(' '));
                    let sended = video.all[collect]
                    console.log(sended)

                    if (sended) {
                        let song = {
                            title: sended.title,
                            url: sended.url,
                            type: 'normal',
                            app: 'YouTube',
                            customurl: sended.url,
                            addedby: message.author.username,
                            addedid: message.author.id,
                            duration: sended.duration.timestamp,
                        }

                        await handleResource(song, message, args, voice_channel, player, 'normal', 'false', client);
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setDescription(`**An error occurred while finding video**`)
                        return message.channel.send({ embeds: [embed] });
                    }
                }
                findSong(numbers[collected])
            })



    }
}