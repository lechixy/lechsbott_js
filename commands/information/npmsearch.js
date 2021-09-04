const fetch = require("node-fetch");
const moment = require("moment");

module.exports = {
    name: 'npmsearch',
    aliases: ['searchnpm', 'modulesearch'],
    description: 'npm cmd',
    async execute(client, message, args, cmd, Discord) {
        let query = args.join(' '); //Gets what the user searched for
        if (!query) query = await awaitMessages(message); //If the user didnt search for anything it will then send a message asking them what they want to search
        if (!query) return;
        const res = await fetch(`https://registry.npmjs.com/${encodeURIComponent(query)}`).catch(err => console.log(err));
        if (res.status === 404) return message.channel.send('No search results found, maybe try searching for something that exists.'); //If the page was not found tell the author of the mesage
        const body = await res.json();
        const embed = new Discord.MessageEmbed()
            .setColor(0xde2c2c)
            .setTitle(body.name) //The name of the package
            .setURL(`https://www.npmjs.com/package/${body.name}`) //URL for the npm package page
            .setDescription(body.description || 'No description.') //What the purpose of the package is
            .addField('Version', body['dist-tags'].latest, true) //The current version of the package
            .addField('License', body.license || 'None', true) //There license type
            .addField('Author', body.author ? body.author.name : '???', true) //Github author name
            .addField('Creation Date', moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'), true) //When was the initial commit
            .addField('Modification Date', body.time.modified ? moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss') : 'None', true) //Last updated or modified
            .addField('Repository', body.repository ? `[View Here](${body.repository.url.split('+')[1]})` : 'None', true) //Github link
            .addField('Maintainers', body.maintainers.map(user => user.name).join(', ')) //People that have worked and helped make the package
        message.channel.send({ embeds: [embed] });

        async function awaitMessages(message) {
            let responce;

            const filter = (user) => { //filters so only the person who sent the command will be able to search or cancel search
                return user.author.id === message.author.id;
            };

            const serchembed = new Discord.MessageEmbed()
                .setTitle("Search On NPMJS")
                .setDescription("What NPMJS Package Are You Looking For? Just Type Then I Will Search! You Have **60s** ⌛ \nType `cancel` to cancel the command.")
                .setThumbnail('https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png')
                .setColor("RED");

            message.channel.send({ embeds: [serchembed] }); //sends the message above^

            await message.channel.awaitMessages(filter, { 
                max: 1, //sets the amount of responses to 1
                time: 60000, //sets the amount of time for the user to respond
                errors: ['time'] 
            })
                .then((msg) => {
                    const firstMsg = msg.first();
                    if (firstMsg.content.toLowerCase() === 'cancel') return firstMsg.react('👍'); //if the author responds with 'cancel' then the bot will show that it canceled it and then cancel the command
                    responce = firstMsg.content;
                })
                .catch(() => {
                    message.channel.send('You didn\'t Respond. Command Canceled.'); //didnt respond in 60 seconds so it cancels the command
                });

            return responce;
        }
    }
}
