const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: 'ban',
    aliases: ['unban', 'pardon', 'kick'],
    description: 'ban',
    async execute(client, message, args, cmd, Discord) {
        const user = message.author;
        let member
        if (message.mentions.members.first()) {
            member = message.mentions.members.first()
        } else if (args[0]) {
            member = await message.guild.members.cache.get(args[0])
        }

        if (cmd === 'ban') {

            if (!message.member.permissions.has("BAN_MEMBERS")) {
                let permembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`**You need to** \`Ban Members\` **permission to ban a member!**`)
                return message.channel.send({ embeds: [permembed] })
            }

            if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
                const embed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setDescription(`**Lechsbott needs to** \`Ban Members\` **permission to ban a member!**`)
                return message.channel.send({ embeds: [embed] });
            }

            if (!member) {
                let membembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setAuthor(`Please mention a member for ${cmd}!`, user.displayAvatarURL({ dynamic: true }))
                    .addField(`Usage`, `${PREFIX}${cmd} <@User | User Id>`)
                return message.channel.send({ embeds: [membembed] })
            }

            if (member.id === message.author.id) {
                let membembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setTitle(`Oops, there is a mistake`)
                    .setDescription(`You cannot ${cmd} yourself!`)
                return message.channel.send({ embeds: [membembed] })
            }

            if (member.id === message.guild.me.id) {
                let membembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setTitle(`Oops, there is a mistake`)
                    .setDescription(`I cannot ${cmd} myself!`)
                return message.channel.send({ embeds: [membembed] })
            }

            if (message.author.id !== message.guild.ownerId) {
                let erembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setTitle(`Oops, there is a mistake`)
                    .setTitle(`You cannot ${cmd} guild owner!`)
                return message.channel.send({ embeds: [erembed] })
            }

            if (message.author.id !== message.guild.ownerId && message.member.roles.highest.position <= member.roles.highest.position) {

                let erembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setTitle(`You can't do that`)
                    .setDescription(`Because you either have the same role or your role is lower from ${member}`)
                return message.channel.send({ embeds: [erembed] })
            }

            if (message.guild.me.roles.highest.position <= member.roles.highest.position) {
                let erembed = new Discord.MessageEmbed()
                    .setColor(roleColor(message))
                    .setTitle(`I cannot ${cmd} this user`)
                    .setDescription(`Because i have the same role or your role is lower from ${member}`)
                return message.channel.send({ embeds: [erembed] })
            }

            return banUser(message, member, args)

        }
    }
}

function banUser(message, member, args) {

    const Discord = require('discord.js')

    const reason = args.slice(1).join(" ") || `No reason specified`

    try {

        member.ban({ reason })


        let succesembed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setDescription(`**${member.user.tag}** has been banned from **${message.guild.name}**`)
            .setImage(`https://c.tenor.com/ixtZFk44cMcAAAAC/discord-banhammer.gif`)
        message.channel.send({ embeds: [succesembed] })

        member.createDM().then(dm => {

            const embed = new Discord.MessageEmbed()
                .setTitle(`You have been banned from ${message.guild.name}`)
                .addField(`Reason`, `${reason}`, true)
                .addField(`By`, `${message.author.tag}`, true)
                .addField(`At`, `<t:${parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0))}>`, true)
                .setColor('RED')
            dm.send({ embeds: [embed] })
        })

    } catch (e) {

        console.log(e)

        message.channel.send({ content: `There was an error while banning the member, please try later!` })

    }
}