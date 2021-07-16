const fetch = require("node-fetch")
const { LECHSBOTTKEY } = require("../util/lechsbottUtil")

module.exports = {
    name:'watchyt',
    aliases:['playpokernight', 'playbetrayal.io', 'playfishington.io'],
    description:'try',
    async execute(client, message, args, cmd, Discord) {
        if(cmd === 'watchyt'){
            let channel = message.member.voice.channel;
            if(!channel){
                const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to be in a voice channel!`, message.author.displayAvatarURL({dynamic: true}))
                .setColor('#B30000')
                return message.channel.send(embed);
            }

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
                    .setAuthor(`Sorry but we cannot start YouTube Together`, message.author.displayAvatarURL({dynamic: true}))
                    .setColor('#B30000')
                    message.channel.send(embed);
                }

                
                const embed = new Discord.MessageEmbed()
                .setTitle(`Click here to watch YouTube`)
                .setURL(`https://discord.com/invite/${invite.code}`)
                .setColor('#B30000')
                message.channel.send(embed).then(m => {
                    m.react('<:youtube:846030610526634005>')
                    m.delete({ timeout: 60000 })
                })

                
            })
        } else if(cmd === 'playpokernight'){
            let channel = message.member.voice.channel;
            if(!channel){
                const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to be in a voice channel!`, message.author.displayAvatarURL({dynamic: true}))
                .setColor('#B300B3')
                return message.channel.send(embed);
            }

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
                        .setAuthor(`Sorry but we cannot start Poker Night`, message.author.displayAvatarURL({dynamic: true}))
                        .setColor('#B300B3')
                        message.channel.send(embed);
                    }

                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Click here to play the Poker Night`)
                    .setURL(`https://discord.com/invite/${invite.code}`)
                    .setColor('#B300B3')
                    message.channel.send(embed).then(m => {
                        m.react('<:poker_cards:863549182635933697>')
                        m.delete({ timeout: 60000 })
                    })
                    
                })
        } else if(cmd === 'playbetrayal.io'){
            let channel = message.member.voice.channel;
            if(!channel){
                const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to be in a voice channel!`, message.author.displayAvatarURL({dynamic: true}))
                .setColor('#B3A100')
                return message.channel.send(embed);
            }

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
                        .setAuthor(`Sorry but we cannot start Betrayal.io`, message.author.displayAvatarURL({dynamic: true}))
                        .setColor('#B3A100')
                        message.channel.send(embed);
                    }

                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Click here to play the Betrayal.io`)
                    .setURL(`https://discord.com/invite/${invite.code}`)
                    .setColor('#B3A100')
                    message.channel.send(embed).then(m => {
                        m.react('🔪')
                        m.delete({ timeout: 60000 })
                    })  
                })
        } else if(cmd === 'playfishington.io'){
            let channel = message.member.voice.channel;
            if(!channel){
                const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to be in a voice channel!`, message.author.displayAvatarURL({dynamic: true}))
                .setColor('#0089B3')
                return message.channel.send(embed);
            }

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
                        .setAuthor(`Sorry but we cannot start Fishingtion.io`, message.author.displayAvatarURL({dynamic: true}))
                        .setColor('#0089B3')
                        message.channel.send(embed);
                    }

                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Click here to play the Fishingtion.io`)
                    .setURL(`https://discord.com/invite/${invite.code}`)
                    .setColor('#0089B3')
                    message.channel.send(embed).then(m => {
                        m.react('🐟')
                        m.delete({ timeout: 60000 })
                    })
                })
        }
  }
}
