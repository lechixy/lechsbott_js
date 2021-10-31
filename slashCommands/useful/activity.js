const fetch = require("node-fetch")
const { LECHSBOTTKEY } = require("../../commands/util/lechsbottUtil")
const { SlashCommand } = require('../../lechs_modules/SlashCommand/index')

module.exports = new SlashCommand({
    name: 'activity',
    description: 'Use discords new voice channel activities!',
    options: [
        {
            name: 'which',
            description: 'Which activity you want to start?',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'Youtube',
                    value: 'yt',
                },
                {
                    name: 'Youtube Dev',
                    value: 'ytdev',
                },
                {
                    name: 'Poker Night',
                    value: 'poker',
                },
                {
                    name: 'Chess In The Park',
                    value: 'chess',
                },
                {
                    name: 'Chess In The Park Dev',
                    value: 'youtube',
                },
                {
                    name: 'Betrayal.io',
                    value: 'betrayal',
                },
                {
                    name: 'Fishington.io',
                    value: 'fishington'
                },
            ]
        },
    ],
    async execute({ client, interaction, args, Discord }) {

        let channel = interaction.member.voice.channel;
        if (!channel) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to be in a voice channel for activities!`, interaction.user.displayAvatarURL({ dynamic: true }))
            return interaction.followUp({ embeds: [embed] });
        }

        const selection = interaction.options.get("which")

        let activities = {
            yt: {
                id: "880218394199220334",
                name: "YouTube",
                color: '#FF0000',
            },
            ytdev: {
                id: "880218832743055411",
                name: "YouTube Dev",
                color: '#880000',
            },
            poker: {
                id: "755827207812677713",
                name: "Poker Night",
                color: '#F700FF',
            },
            betrayal: {
                id: "773336526917861400",
                name: "Betrayal.io",
                color: '#B86E00',
            },
            fishington: {
                id: "814288819477020702",
                name: "Fishington.io",
                color: '#0099FF',
            },
            chess: {
                id: "832012774040141894",
                name: "Chess In The Park",
                color: '#259E00',
            },
            chessdev: {
                id: "832012586023256104",
                name: "Chess In The Park Dev",
                color: '#155C00',
            },

        }

        let selectedactivity = activities[`${selection.value}`]

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: `${selectedactivity.id}`,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${LECHSBOTTKEY}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(async invite => {
                if (!invite.code) {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`Sorry but we cannot start ${selectedactivity.name}`, interaction.user.displayAvatarURL({ dynamic: true }))
                        .setColor(`${selectedactivity.color}`)
                    interaction.followUp({ embeds: [embed] });
                }

                const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel('Start Activity')
                        .setURL(`https://discord.com/invite/${invite.code}`)
                )


                const embed = new Discord.MessageEmbed()
                    .setTitle(`Click button to start ${selectedactivity.name}`)
                    .setColor(`${selectedactivity.color}`)
                interaction.followUp({ embeds: [embed], components: [row] })


            })


    }
})