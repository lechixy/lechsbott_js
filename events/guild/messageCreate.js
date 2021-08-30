const cooldowns = new Map();
const { PREFIX, OWNERS } = require("../../commands/util/lechsbottUtil")
const profileModel = require('../../models/profileSchema')
const db = require('../../models/afkSchema');
const moment = require('moment')

module.exports = async (Discord, client, message) => {
    const prefix = PREFIX;

    if (message.author.bot) return;

    db.findOne({ Guild: message.guild.id, Member: message.author.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.delete()

            return message.channel.send({ content: `<@${message.author.id}> welcome back, i removed your afk!` })
        } else return;
    })

    if (message.mentions.members.first()) {
        db.findOne({ Guild: message.guild.id, Member: message.mentions.members.first().id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                const member = message.guild.members.cache.get(data.Member);

                return message.channel.send({ content: `<@${member.user.id}> is now afk: ${data.Content} ${moment(parseInt(data.TimeAgo)).fromNow()}` })
            } else return;
        })
    }

    if(!message.content.startsWith(prefix)) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id })
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0,
                accepted: false,
            })
            profile.save();
        }
    } catch (err) {
        console.log(err);
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) ||
        client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    // const udatabase = require('../../commands/util/systemdatabase')
    // const gdatabase = require('../../commands/util/guilddatabase')
    // const Users = udatabase();
    // const Guilds = gdatabase();

    try {
        if (command) {

            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            if (command.cooldown) {
                const current_time = Date.now();
                const time_stamps = cooldowns.get(command.name);
                const cooldown_amount = (command.cooldown) * 1000;

                if (time_stamps.has(message.author.id)) {
                    const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

                    if (current_time < expiration_time) {
                        const time_left = (expiration_time - current_time) / 1000;

                        console.log(`${message.author.tag} used ${PREFIX}${command.name} many times and catched to ${time_left.toFixed(1)}s cooldown`)

                        let embed = new Discord.MessageEmbed()
                            .setDescription(`**Slowly slowly, please wait ${time_left.toFixed(1)}s to type a command**`)
                        return message.channel.send({ embeds: [embed] })
                    }
                }

                //If the author's id is not in time_stamps then add them with the current time.
                time_stamps.set(message.author.id, current_time);
                //Delete the user's id once the cooldown is over.
                setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
            }
            if (command.ownerOnly) {

                if (!OWNERS.includes(message.author.id)) {
                    console.log(`${message.author.tag} tried use an owner command!`)
                } else {
                    console.log(`${message.author.tag} used an owner command ${cmd} in ${message.guild.name}`)

                    return command.execute(client, message, args, cmd, Discord)
                }
            }

            command.execute(client, message, args, cmd, Discord)

            console.log(`${message.author.tag} has used ${PREFIX}${cmd} in ${message.guild.name}`)
        }
    } catch (err) {
        let errembed = new Discord.MessageEmbed()
            .setDescription('There was an error trying to execute this command!')
        message.channel.send({ embeds: [errembed] })
        console.log(err)
    }

}
