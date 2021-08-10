const fetch = require("node-fetch")
const { LECHSBOTTKEY } = require("../../commands/util/lechsbottUtil")

module.exports = {
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
                    name: '💖 Youtube Together',
                    value: 'Youtube Together',
                },
                {
                    name: '🃏 Poker Night',
                    value: 'Poker Night',
                },
                {
                    name: '🔪 Betrayal.io',
                    value: 'Betrayal.io',
                },
                {
                    name: '🐟 Fishington.io',
                    value: 'Fishington.io'
                }
            ]
        },
    ],
    async execute(client, interaction, args, Discord) {
        
            let channel = interaction.member.voice.channel;
            if(!channel){
                const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to be in a voice channel for activities!`, interaction.user.displayAvatarURL({dynamic: true}))
                return interaction.followUp({ embeds: [embed] });
            }

            const selection = interaction.options._hoistedOptions[0].value

            if(selection === 'Youtube Together'){
                fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755600276941176913",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${LECHSBOTTKEY}`,
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json())
                .then(async invite =>{
                    if(!invite.code){
                        const embed = new Discord.MessageEmbed()
                        .setAuthor(`Sorry but we cannot start YouTube Together`, interaction.user.displayAvatarURL({dynamic: true}))
                        .setColor('#FF0000')
                        interaction.followUp({ embeds: [embed] });
                    }
    
                    
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Click here to watch YouTube`)
                    .setURL(`https://discord.com/invite/${invite.code}`)
                    .setColor('#FF0000')
                    interaction.followUp({ embeds: [embed] }).then(m => {
                        m.react('<:youtube:846030610526634005>')
                    })
    
                    
                })
            } else if(selection === 'Poker Night'){
                fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "755827207812677713",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${LECHSBOTTKEY}`,
                    "Content-Type": "application/json"
                }
                }).then(res => res.json())
                .then(async invite =>{
                    if(!invite.code){
                        const embed = new Discord.MessageEmbed()
                        .setAuthor(`Sorry but we cannot start Poker Night`, interaction.user.displayAvatarURL({dynamic: true}))
                        .setColor('#FF00FF')
                        interaction.followUp({ embeds: [embed] });
                    }

                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Click here to play the Poker Night`)
                    .setURL(`https://discord.com/invite/${invite.code}`)
                    .setColor('#FF00FF')
                    interaction.followUp({ embeds: [embed] }).then(m => {
                        m.react('<:poker_cards:863549182635933697>')
                    })
                    
                })
            } else if(selection === 'Betrayal.io'){
                fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "773336526917861400",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${LECHSBOTTKEY}`,
                    "Content-Type": "application/json"
                }
                }).then(res => res.json())
                .then(async invite =>{
                    if(!invite.code){
                        const embed = new Discord.MessageEmbed()
                        .setAuthor(`Sorry but we cannot start Betrayal.io`, interaction.user.displayAvatarURL({dynamic: true}))
                        .setColor('#FFE600')
                        interaction.followUp({ embeds: [embed] });
                    }

                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Click here to play the Betrayal.io`)
                    .setURL(`https://discord.com/invite/${invite.code}`)
                    .setColor('#FFE600')
                    interaction.followUp({ embeds: [embed] }).then(m => {
                        m.react('🔪')
                    })  
                })
            } else if(selection === 'Fishington.io'){
                fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "814288819477020702",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${LECHSBOTTKEY}`,
                    "Content-Type": "application/json"
                }
                }).then(res => res.json())
                .then(async invite =>{
                    if(!invite.code){
                        const embed = new Discord.MessageEmbed()
                        .setAuthor(`Sorry but we cannot start Fishingtion.io`, interaction.user.displayAvatarURL({dynamic: true}))
                        .setColor('#00C3FF')
                        interaction.followUp({ embeds: [embed] });
                    }

                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Click here to play the Fishingtion.io`)
                    .setURL(`https://discord.com/invite/${invite.code}`)
                    .setColor('#00C3FF')
                    interaction.followUp({ embeds: [embed] }).then(m => {
                        m.react('🐟')
                    })
                })
            }
        
        
 }
}