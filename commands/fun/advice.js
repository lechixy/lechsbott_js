module.exports = {
    name: 'advice',
    aliases: ['getadvice'],
    cooldown: 3,
    description: 'Get an advice quickly!',
    category: ['Fun'],
    arguments: `<none>`,
    async execute(client, message, args, cmd, Discord){
        const fetch = require('node-fetch');

        fetch('https://api.adviceslip.com/advice')
        .then(res => res.json())
        .then(json => {
          const embed = new Discord.MessageEmbed()
            .setAuthor('Advice')
            .setDescription(json.slip.advice)
            .setTimestamp()
          message.channel.send({ embeds: [embed] });
          return;
        })
        .catch(err => {
          message.reply('Failed to deliver advice');
          return console.error(err);
        });
    }
}

