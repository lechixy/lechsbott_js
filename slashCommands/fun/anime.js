const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const { Slash } = require("djs-anime")
const axios = require('axios')
const { get } = require('request-promise-native')

module.exports = {
    name: 'anime',
    description: 'Send channel to wonderful anime pictures!',
    options: [
        {
            name: "search",
            description: "Search animes on Kitsu!",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "query",
                    description: "What you search on Kitsu?",
                    type: "STRING",
                    required: true,
                },
            ]
        },
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
        if(selection === 'search'){
            const usersearch = encodeURIComponent(interaction.options.getString('query'))

            let options = {
                url: `https://kitsu.io/api/edge/anime?filter[text]=${usersearch}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                },
                json: true
            }

            get(options).then(body => {

                const roleColor = interaction.guild.me.displayHexColor === "#000000" ? "#ffffff" : interaction.guild.me.displayHexColor

                if(body.data.length === 0){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`Oopps something went wrong`, interaction.user.displayAvatarURL({dynamic: true}))
                    .setDescription(`There is no anime with **${interaction.options.getString('query')}** name, please sure entered correctly!`)
                    .setColor(roleColor)
                    return interaction.followUp({ embeds: [embed] });
                }

                const anim = body.data[0]
                
                const embed = new Discord.MessageEmbed()
                .setTitle(`${anim.attributes.canonicalTitle}`)
                .setColor(roleColor)
                .setURL(`https://kitsu.io/anime/${anim.id}`)
                .setThumbnail(anim.attributes.posterImage.original)
                .setImage(anim.attributes.coverImage.original)
                .setDescription(`${anim.attributes.description}`)
                .addField(`⌛ Status`, `${anim.attributes.status}`, true)
                .addField(`📚 Category`, `${anim.attributes.showType}`, true)
                .addField(`▶ Age Rating`, `${anim.attributes.ageRatingGuide}`)
                .addField(`📅 Stream Date`, 
                `From **${anim.attributes.startDate}** to **${anim.attributes.endDate}**`
                )
                .addField(`🎬 Total Episodes`, `${anim.attributes.episodeCount}`, true)
                .addField(`⏱ Per Episode Length`, `${anim.attributes.episodeLength}`, true)
                .addField(`⭐ Average Point`, `${anim.attributes.averageRating}/100`, true)
                .addField(`🏆 Ratings On Kitsu`, `TOP ${anim.attributes.ratingRank}`)
                interaction.followUp({ embeds: [embed] });

            })


        }
        else if (selection === 'nsfw') {
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