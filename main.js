const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const dotenv = require('dotenv')

const memberCounter = require('./commands/counters/member-counter')

client.commands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.on('ready', () => {
    let actvs = [
        // `the ${client.users.cache.size} users!`,
        `just under development!`,
        `just under development!`,
    ];

    
    const index = Math.floor(Math.random() * (actvs.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    client.user.setActivity(actvs[index], { type: 'WATCHING' }); // sets bot's activities to one of the phrases in the arraylist.

    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);

});

client.login('NzUzOTA2ODc0NzI5ODg5ODUz.X1tAfQ.G-PKpPkxl9D7uVEkNigw9zfXZsM');