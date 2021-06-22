const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  name: "shutdown",
  cooldown: '0',
  aliases: ['sd'],
  description: "Shutdown the bot from chat!",
  async execute(client, message, args, cmd, Discord){
    const { OWNER1 } = require("../util/lechsbottUtil");
    const { OWNER2 } = require("../util/lechsbottUtil");

    if(message.author.id == OWNER1 || message.author.id == OWNER2) {
      await message.channel.send(`Shutting down every process, code, script, command!`).then(
        console.log('Lechixy🦋 used shutdown command, now lechsbott is offline!'));
      client.destroy();
    } else {
      message.channel.send(` This is an owner command, you cannot use this command!`).then(sentMessage => {
        sentMessage.react('❌')
      })
    } 
  }
} 