const { PREFIX, OWNER1, OWNER2 } = require("../../commands/util/lechsbottUtil")

module.exports = async (Discord, client, interaction) => {

  if (interaction.isCommand()) {
    await interaction.deferReply().catch((e) => {
      console.log(e);
    });

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error occurred while executing, please try later" });

    const args = [];
    
    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
              if (x.value) args.push(x.value);
          });
      } else if (option.value) args.push(option.value);
  }

    try {
      if (cmd) {

        cmd.execute(client, interaction, args, Discord).catch(err => {
          cmd.execute({client, interaction, args, Discord})
        })

        console.log(`${interaction.user.tag} has used /${cmd.name} in ${interaction.guild.name}`)

      }
    } catch (e) {

      interaction.followUp({ content: "An error occurred while executing, please try later" });
      return console.log(e)
    }

  }

  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.execute(client, interaction, Discord);
  }

}