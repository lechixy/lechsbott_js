module.exports = {
    name: 'purge',
    aliases: ['clear'],
    cooldown: 5,
    description: 'Clear just users messages!',
    async execute(client, message, args, cmd, Discord) {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            let permsembed = new Discord.MessageEmbed()
                .setDescription(`**You are not able to use this command!**`)
                .addField(
                    "Needed Permissions",
                    "Manage Messages"
                );
            return message.channel.send({ embeds: [permsembed] });
        }

        if (
            !message.guild.me.permissions.has("MANAGE_MESSAGES")
        ) {
            let permsembed = new Discord.MessageEmbed()
                .setDescription(`**There are missing permissions for lechsbott**`)
                .addField(
                    "Needed Permissions",
                    "Manage Messages"
                );
            return message.channel.send({ embeds: [permsembed] });
        }

        message.delete()
        const member = message.mentions.members.first();
        const messages = message.channel.messages.fetch();

        if (member) {
            const userMessages = (await messages).filter(
                (m) => m.author.id === member.id
            );

            const embed = new Discord.MessageEmbed()
                .setDescription(`**${member} messages has been deleted!**`)
            message.channel.send({ embeds: [embed] }).then(m => {
                setTimeout(function () {
                    if (m.deleted === true) {
                        m.delete()
                    }
                }, 7500)
            }
            )

            await message.channel.bulkDelete(userMessages, true)
        } else {
            const user = message.author;
            if (!args[0]) {
                let argsembed0 = new Discord.MessageEmbed()
                    .setAuthor(`Please enter the amount of messages you want to clear!`, user.displayAvatarURL({ dynamic: true }))
                return message.channel.send({ embeds: [argsembed0] }).then(m => {
                    setTimeout(function () {
                        if (m.deleted === true) {
                            m.delete()
                        }
                    }, 7500)
                }
                )
            }
            if (isNaN(args[0])) {
                let argsembed1 = new Discord.MessageEmbed()
                    .setAuthor(`Please enter a real number!`, user.displayAvatarURL({ dynamic: true }))
                return message.channel.send({ embeds: [argsembed1] }).then(m => {
                    setTimeout(function () {
                        if (m.deleted === true) {
                            m.delete()
                        }
                    }, 7500)
                }
                )
            }

            if (args[0] > 100) {
                let argsembed2 = new Discord.MessageEmbed()
                    .setAuthor(`You cannot delete more than 100 messages!`, user.displayAvatarURL({ dynamic: true }))
                return message.channel.send({ embeds: [argsembed2] }).then(m => {
                    setTimeout(function () {
                        if (m.deleted === true) {
                            m.delete()
                        }
                    }, 7500)
                }
                )
            }
            if (args[0] < 1) {
                let argsembed3 = new Discord.MessageEmbed()
                    .setAuthor(`You must delete at least one message!`, user.displayAvatarURL({ dynamic: true }))
                return message.channel.send({ embeds: [argsembed3] }).then(m => {
                    setTimeout(function () {
                        if (m.deleted === true) {
                            m.delete()
                        }
                    }, 7500)
                }
                )
            }
            let argsembed4 = new Discord.MessageEmbed()
                .setAuthor(`Deleted ${args[0]} messages on #${message.channel.name}`, user.displayAvatarURL({ dynamic: true }))

            //For delete messages
            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages, true)
                return message.channel.send({ embeds: [argsembed4] }).then(m => {
                    setTimeout(function () {
                        if (m.deleted === true) {
                            m.delete()
                        }
                    }, 7500)
                }
                )
            })
        }
    }
}