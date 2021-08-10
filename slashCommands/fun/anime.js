const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const akaneko = require("akaneko")

module.exports = {
    name: 'anime',
    description: 'Send channel to wonderful anime pictures!',
    options: [
        {
            name: "sfw",
            description: "Category sfw(for everyone) anime pictures and gifs!",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "type",
                    description: "The type of picture to send",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "hug",
                            value: "hug",
                        },
                        {
                            name: "kiss",
                            value: "kiss",
                        },
                        {
                            name: "slap",
                            value: "slap",
                        },
                        {
                            name: "punch",
                            value: "punch",
                        },
                        {
                            name: "wink",
                            value: "wink",
                        },
                        {
                            name: "pat",
                            value: "pat",
                        },
                        {
                            name: "kill",
                            value: "kill",
                        },
                        {
                            name: "cuddle",
                            value: "cuddle",
                        },
                    ]
                },
            ]
        },
        {
            name: "nsfw",
            description: "Category nsfw(for adults) anime pictures and gifs!",
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
                    ]
                },
            ]
        },

    ],
    async execute(client, interaction, args, Discord) {
        
        const selection = interaction.options?.get('sfw')?.options?.get('type')?.value
        if(selection === undefined){
            const selectionnsfw = interaction.options?.get('nsfw')?.options?.get('type')?.value

            let dangerousembed = new Discord.MessageEmbed()
            .setAuthor(`An important warning`)
            .setColor('#FF5656')
            .setDescription(`nsfw setting for this channel is turned off if you want use this command turn on the nsfw for this channel!`)
            .setImage('https://cdn.discordapp.com/attachments/843582665051471942/859929784829214720/nsfw.png')
            

            let animeembed = new Discord.MessageEmbed()

            if(selectionnsfw === 'hentai'){

                if(!interaction.channel.nsfw === true){
                    return interaction.followUp({ embeds: [dangerousembed] })
                }

                let { image } = await API.nsfw.hentai()

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            } else if(selectionnsfw === 'boobs'){

                if(!interaction.channel.nsfw === true){
                    return interaction.followUp({ embeds: [dangerousembed] })
                }

                let { image } = await API.nsfw.boobs()

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            } else if(selectionnsfw === 'lesbian'){

                if(!interaction.channel.nsfw === true){
                    return interaction.followUp({ embeds: [dangerousembed] })
                }

                let { image } = await API.nsfw.lesbian()

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            }

        } else {

            let animeembed = new Discord.MessageEmbed()

            if(selection === 'hug'){
                let { image } = await API.sfw.hug();

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            } else if(selection === 'kiss'){
                let { image } = await API.sfw.kiss();

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            } else if(selection === 'slap'){
                let { image } = await API.sfw.slap();
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})

                animeembed.setImage(image)
            } else if(selection === 'punch'){
                let { image } = await API.sfw.punch();

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            } else if(selection === 'wink'){
                let { image } = await API.sfw.wink();

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            } else if(selection === 'pat'){
                let { image } = await API.sfw.pat();

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            } else if(selection === 'kill'){
                let { image } = await API.sfw.kill();

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            } else if(selection === 'cuddle'){
                let { image } = await API.sfw.cuddle();

                animeembed.setImage(image)
                return interaction.followUp({ embeds: [animeembed], ephemeral: true})
            }
        }
    }
}