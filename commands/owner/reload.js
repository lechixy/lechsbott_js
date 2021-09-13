const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
  name: "reload",
  description: "",
  aliases: ['sreload'],
  ownerOnly: true,
  async execute(client, message, args, cmd, Discord) {


    if(cmd === 'reload') {
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
    } else if(cmd === 'sreload'){

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
          require.resolve(`../../slashCommands/${category}/${endext}`)
        ]; //Change the path depending on how are your folders located.
        client.slashCommands.delete(command);
        const pull = require(`../../slashCommands/${category}/${endext}`);
        client.slashCommands.set(command, pull);
  
        return message.channel.send(`**${endext}** was reloaded succesfully!`);
      } catch (error) {
        return message.channel.send(
          `There was an error trying to reload **${endext}**:\n\`\`\`${error.message}\`\`\``
        );
      }
    
    } else if(cmd === 'ereload'){

      if (!args[0]){
        return message.channel.send({ content: `**Please specify a category:** \`${PREFIX}${cmd} <category> <event>\`` });
      }
        
      if (!args[1]){
        return message.channel.send({ content: `**Please specify a command:** \`${PREFIX}${cmd} <category> <event>\`` });
      }
  
      let category = args[0];
      let command = args[1].toLowerCase();
      let endext = command.endsWith('.js') ? command : command+'.js'
  
      try {
  
        delete require.cache[
          require.resolve(`../../events/${category}/${endext}`)
        ]; //Change the path depending on how are your folders located.
        client.events.delete(command);
        const pull = require(`../../events/${category}/${endext}`);
        client.events.set(command, pull);
  
        return message.channel.send(`**${endext}** was reloaded succesfully!`);
      } catch (error) {
        return message.channel.send(
          `There was an error trying to reload **${endext}**:\n\`\`\`${error.message}\`\`\``
        );
      }
    
    }


  }
}
