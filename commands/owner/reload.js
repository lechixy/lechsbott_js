module.exports = {
  name: "reload",
  aliases: "reloadacmd",
  description: "",
  ownerOnly: true,
  async execute(client, message, args, cmd, Discord) {

    if (!args[0])
      return message.channel.send(
        "You need to include the category of the command"
      );
    if (!args[1])
      return message.channel.send(
        "You need to include the name of the command!"
      );

    let category = args[0];
    let command = args[1].toLowerCase();
    try {
      delete require.cache[
        require.resolve(`../../commands/${category}/${command}.js`)
      ]; //Change the path depending on how are your folders located.
      client.commands.delete(command);
      const pull = require(`../../commands/${category}/${command}.js`);
      client.commands.set(command, pull);

      return message.channel.send(`**${command}** was reloaded succesfully!`);
    } catch (error) {
      return message.channel.send(
        `There was an error trying to reload **${command}**: \`${error.message}\``
      );
    }
  },
};
