const { PREFIX } = require("../util/lechsbottUtil")
const { readdirSync } = require("fs");
const { firstLetter, roleColor } = require("../util/lechsbottFunctions")

module.exports = {
    name: "help",
    cooldown: 5,
    description: "How is working?",
    category: ['lechsbott'],
    arguments: `<category | command | none>`,
    async execute(client, message, args, cmd, Discord) {

        if (!args[0]) {

            let categories = [];
            // let emojis = {
            //     "fun": "<a:woooza:846030613198274609>",
            //     "guild": "<:ownercrown:902603217337208872>",
            //     "information": "📜",
            //     "lechsbott": "✨",
            //     "music": "<a:musicdisc:902604847289872496>",
            //     "social": "<:hearty:899267054471888936>",
            //     "user": "👋",
            //     "Moderation": "<:ban:846030610954584064>",
            //     "Utility": "<a:hypeshiny:902593111354646529>",
            // };

            readdirSync("./commands/").forEach((dir) => {

                if(['counters', 'logs', 'owner', 'util'].includes(dir)) {
                    return
                }

                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return;

                    let name = file.name.replace(".js", "");

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: `${firstLetter(dir)} [${cmds.length}]`,
                    value: cmds.length === 0 ? "No commands" : cmds.join(" "),
                };

                categories.push(data);
            });
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Command List`, message.author.displayAvatarURL({dynamic: true}))
                .setDescription(`A list of commands for help about complicated commands!\nNeed more information about command? Use \`${PREFIX}${cmd} <command>\``)
                .addFields(categories)
                .setTimestamp()
                .setColor(roleColor(message))
            return message.channel.send({ embeds: [embed] });
        }

    }
}