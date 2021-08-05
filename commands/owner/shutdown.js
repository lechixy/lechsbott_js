module.exports = {
  name: "shutdown",
  cooldown: '0',
  aliases: ['sd'],
  description: "Shutdown the bot from chat!",
  ownerOnly: true,
  async execute(client, message, args, cmd, Discord){

      await message.channel.send(`Shutting down every process, code, script, command!`).then(
        console.log('Lechixy🦋 used shutdown command, now lechsbott is offline!'));
      client.destroy();
    
  }
} 