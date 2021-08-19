const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const { Slash } = require("djs-anime")
const axios = require('axios')

module.exports = {
    name: 'anime',
    description: 'Send channel to wonderful anime pictures!',
    options: [
        {
            name: "sfw",
            description: "Get anime pictures and gifs!",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "type",
                    description: "The type of picture to send",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "cuddle",
                            value: "cuddle",
                        },
                        {
                            name: "kiss",
                            value: "kiss",
                        },
                        {
                            name: "hug",
                            value: "hug",
                        },
                        {
                            name: "bully",
                            value: "bully",
                        },
                        {
                            name: "poke",
                            value: "poke",
                        },
                        {
                            name: "kick",
                            value: "kick",
                        },
                        {
                            name: "slap",
                            value: "slap",
                        },
                        {
                            name: "happy",
                            value: "happy",
                        },
                        {
                            name: "kill",
                            value: "kill",
                        },
                        {
                            name: "wink",
                            value: "wink",
                        },
                        {
                            name: "dance",
                            value: "dance",
                        },
                        {
                            name: "cringe",
                            value: "cringe",
                        },
                        {
                            name: "bite",
                            value: "bite",
                        },
                        {
                            name: "handhold",
                            value: "handhold",
                        },
                        {
                            name: "highfive",
                            value: "highfive",
                        },
                        {
                            name: "smile",
                            value: "smile",
                        },
                        {
                            name: "blush",
                            value: "blush",
                        },
                        {
                            name: "yeet",
                            value: "yeet",
                        },
                        {
                            name: "bonk",
                            value: "bonk",
                        },
                        {
                            name: "smug",
                            value: "smug",
                        },
                        {
                            name: "pat",
                            value: "pat",
                        },
                        {
                            name: "lick",
                            value: "lick",
                        },
                        {
                            name: "cry",
                            value: "cry",
                        },
                    ]
                },
            ]
        },
        {
            name: "nsfw",
            description: "Get nsfw/adult anime pictures and gifs!",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "type",
                    description: "The type of picture to send",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "hentai",
                            value: "hentai",
                        },
                        {
                            name: "boobs",
                            value: "boobs",
                        },
                        {
                            name: "lesbian",
                            value: "lesbian",
                        },
                        {
                            name: "waifu",
                            value: "waifu",
                        },
                        {
                            name: "neko",
                            value: "neko",
                        },
                        {
                            name: "trap",
                            value: "trap",
                        },
                        {
                            name: "blowjob",
                            value: "blowjob",
                        },
                    ]
                },
            ]
        },

    ],
    async execute(client, interaction, args, Discord) {

        const selection = interaction.options.getSubcommand()
        if (selection === 'nsfw') {
            const selectionnsfw = interaction.options.getString(`type`)

            let dangerousembed = new Discord.MessageEmbed()
                .setAuthor(`An important warning`)
                .setColor('RED')
                .setDescription(`nsfw setting for this channel is turned off if you want use this command turn on the nsfw for this channel!`)
                .setImage('https://cdn.discordapp.com/attachments/843582665051471942/859929784829214720/nsfw.png')

            if (!interaction.channel.nsfw === true) {
                return interaction.followUp({ embeds: [dangerousembed] })
            }

            if (selectionnsfw === 'hentai') {

                let { image } = await API.nsfw.hentai()


                let animeembed = new Discord.MessageEmbed()
                    .setImage(image)
                    .setFooter(`${selectionsfw}/${client.user.username}`)
                .setTimestamp()
                .setColor('RANDOM')
                    
                return interaction.followUp({ embeds: [animeembed] })
            } else if (selectionnsfw === 'boobs') {

                let { image } = await API.nsfw.boobs()

                let animeembed = new Discord.MessageEmbed()
                    .setImage(image)
                    .setFooter(`${selectionsfw}/${client.user.username}`)
                .setTimestamp()
                .setColor('RANDOM')
                    
                return interaction.followUp({ embeds: [animeembed] })
            } else if (selectionnsfw === 'lesbian') {

                let { image } = await API.nsfw.lesbian()

                let animeembed = new Discord.MessageEmbed()
                    .setImage(image)
                    .setFooter(`${selectionsfw}/${client.user.username}`)
                .setTimestamp()
                .setColor('RANDOM')
                    
                return interaction.followUp({ embeds: [animeembed] })
            } else {

                const url = `https://api.waifu.pics/nsfw/${selectionnsfw}`;
                const get = await axios.get(url)
                const image = get.data.url

                let animeembed = new Discord.MessageEmbed()
                    .setImage(image)
                    .setFooter(`${selectionnsfw}/${client.user.username}`)
                    .setTimestamp()
                    .setColor('RANDOM')
                return interaction.followUp({ embeds: [animeembed] })

            }

        } else if (selection === 'sfw') {
            const selectionsfw = interaction.options.getString(`type`)

            const url = `https://api.waifu.pics/sfw/${selectionsfw}`;
            const get = await axios.get(url)
            const image = get.data.url

            let animeembed = new Discord.MessageEmbed()
                .setImage(image)
                .setFooter(`${selectionsfw}/${client.user.username}`)
                .setTimestamp()
                .setColor('RANDOM')
            return interaction.followUp({ embeds: [animeembed] })
            
        }
    }
}