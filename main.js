const start = Date.now();
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js')
const client = new Client({
    restTimeOffset: 0,
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
    ],
})
const mongoose = require('mongoose')

// const memberCounter = require('./commands/counters/member-counter')
const subCounter = require('./commands/counters/sub-counter')
const twitchCounter = require('./commands/counters/twitch-notify')
const { LECHSBOTTKEY, MONGO_DB_SRV } = require("./commands/util/lechsbottUtil");

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.events = new Discord.Collection();


['slash_handler', 'command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(MONGO_DB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.clear()
    console.log('Successfully connected to lechsbottdb')
}).catch((err) => {
    console.log(err)
})

client.on('ready', async () => {
    subCounter(client, Discord)
    //twitchCounter(client, Discord)

    const milliseconds = Date.now() - start;

    console.log('Lechsbott now online!')
    console.log(`Loaded ${client.commands.size} commands and ${client.slashCommands.size} slash commands, in ${milliseconds / 1000} seconds`);
});

client.login(LECHSBOTTKEY);