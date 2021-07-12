module.exports = {
    name: 'advice',
    aliases: ['getadvice', 'tavsiye'],
    cooldown: 0,
    description: 'This command searches an advice on google and then broadcast to chat!',
    async execute(client, message, args, cmd, Discord){
        const fetch = require('node-fetch');

        fetch('https://api.adviceslip.com/advice')
        .then(res => res.json())
        .then(json => {
          const embed = new Discord.MessageEmbed()
            .setColor('#403B3A')
            .setAuthor('Advice')
            .setDescription(json.slip.advice)
            .setTimestamp()
          message.channel.send(embed);
          return;
        })
        .catch(err => {
          message.reply('Failed to deliver advice');
          return console.error(err);
        });
    }
}

