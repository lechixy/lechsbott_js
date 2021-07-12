const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: "allcommands",
  aliases: "allcmds",
  description: "Shows all available bot commands.",
  async execute(client, message, args){


    const roleColor = "#ffffff";


      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle(`Here are all commands of ${client.user.username}`)
        .addFields(categories)
        .setColor(roleColor);
      return message.channel.send(embed);
  }
}
