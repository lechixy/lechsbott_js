const { PREFIX } = require("../util/lechsbottUtil")
const { roleColor, converToCode } = require("../util/lechsbottFunctions")

module.exports = {
    name: "help",
    cooldown: 5,
    description: "How is working?",
    category: ['lechsbott'],
    arguments: `<command | aliase | none>`,
    async execute(client, message, args, cmd, Discord) {

        if (!args[0]) {

            let allcmds = [];

            let disallowed = ['Owner']

            client.commands.forEach(cmd => {
                if (disallowed.includes(cmd.category[0])) {
                    return
                } else {

                    if (allcmds.find(x => x.name === cmd.category[0])) {
                        const cat = allcmds.findIndex(x => x.name === cmd.category[0])

                        return allcmds[cat].cmds.push(`\`${cmd.name}\``)
                    }

                    let data = {
                        name: cmd.category[0],
                        cmds: [],
                    }

                    allcmds.push(data)
                }
            })

            let fields = []

            allcmds.forEach(category => {
                let data = {
                    name: `${category.name} [${category.cmds.length}]`,
                    value: `${category.cmds.join(' ')}`
                }

                fields.push(data)
            })

            fields.sort((a, b) => {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })

            const embed = new Discord.MessageEmbed()
                .setAuthor(`Command List`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`A list of commands for help about complicated commands!\nNeed more information about command? Use \`${PREFIX}${cmd} <command>\``)
                .addFields(fields)
                .setTimestamp()
                .setColor(roleColor(message))
            return message.channel.send({ embeds: [embed] });
        } else {

            const cmd = client.commands.get(`${args[0].toLowerCase()}`) || client.commands.find(a => a.aliases && a.aliases.includes(args[0]));

            if(!cmd){
                const embed = new Discord.MessageEmbed()
                .setTitle(`${args[0]} is not found`)
                .setDescription(`You can try find with name of the command or a valid aliase for command!`)
                .addField(`Usage`, `${PREFIX}help <command | aliase>`, true)
                return message.channel.send({ embeds: [embed] });
            } else {
                const embed = new Discord.MessageEmbed()
                .setAuthor(`Command Information`, message.author.displayAvatarURL({dynamic: true}))
                .setTitle(`${cmd.name}`)
                .setDescription(`${cmd.description || 'No description is available for command'}`)
                .setTimestamp()

                if(cmd.aliases){
                    embed.addField(`Aliases`, `${converToCode(cmd.aliases.join(' | '))}`)
                }

                if(cmd.arguments){
                    embed.addField(`Arguments`, `${converToCode(cmd.arguments)}`)
                }

                
                
                return message.channel.send({ embeds: [embed] });
            }

        }

    }
}