const { PREFIX, OWNER1, OWNER2 } = require("../../commands/util/lechsbottUtil")

module.exports = async (Discord, client, interaction) => {

    if (interaction.isCommand()) {
        await interaction.deferReply().catch((e) => {
          console.log(e);
        });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: "An error occurred while executing, please try later" });
    
        const args = [];
        interaction.options._hoistedOptions.map((x) => {
          args.push(x.value);
        });

        try {
          if(cmd){

            cmd.execute(client, interaction, args, Discord);

            console.log(`${interaction.user.tag} has used /${cmd.name} in ${interaction.guild.name}`)

          }
        } catch(e) {

          interaction.followUp({ content: "An error occurred while executing, please try later" });
          return console.log(e)
        }
        
      }

}