const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
  name: "reload",
  description: "",
  ownerOnly: true,
  async execute(client, message, args, cmd, Discord) {

    if (!args[0]){
      return message.channel.send({ content: `**Please specify a category:** \`${PREFIX}${cmd} <category> <command>\`` });
    }
      
    if (!args[1]){
      return message.channel.send({ content: `**Please specify a command:** \`${PREFIX}${cmd} <category> <command>\`` });
    }

    let category = args[0];
    let command = args[1].toLowerCase();
    let endext = command.endsWith('.js') ? command : command+'.js'

    try {

      delete require.cache[
        require.resolve(`../../commands/${category}/${endext}`)
      ]; //Change the path depending on how are your folders located.
      client.commands.delete(command);
      const pull = require(`../../commands/${category}/${endext}`);
      client.commands.set(command, pull);

      return message.channel.send(`**${endext}** was reloaded succesfully!`);
    } catch (error) {
      return message.channel.send(
        `There was an error trying to reload **${endext}**:\n\`\`\`${error.message}\`\`\``
      );
    }
  },
};
