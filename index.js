const start = Date.now();
const Discord = require('discord.js');
const { Client, Intents } = Discord;
const client = new Client({
    shards: 'auto',
    restTimeOffset: 250,
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_BANS
    ],
})
const mongoose = require('mongoose')
//const {startWeb} = require('./web/startWeb')

// const memberCounter = require('./commands/counters/member-counter')
const subCounter = require('./commands/counters/sub-counter')
const {videoNotifier} = require('./commands/counters/video-notifier')
const twitchCounter = require('./commands/counters/twitch-notify')
const { LECHSBOTTKEY, MONGO_DB_SRV } = require("./commands/util/lechsbottUtil");

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.events = new Discord.Collection();
client.queue = new Discord.Collection();
// client.autoReply = new Discord.Collection();


['slash_handler', 'command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(MONGO_DB_SRV).then(() => {
    console.log('Successfully connected to lechsbottdb')
}).catch((err) => {
    console.log(err)
})

client.once('ready', async () => {
    subCounter(client, Discord)
    // videoNotifier(client, Discord)
    //twitchCounter(client, Discord)

    const milliseconds = Date.now() - start;

    console.log('Lechsbott now online!')
    console.log(`Loaded ${client.commands.size} commands and ${client.slashCommands.size} slash commands to ${client.guilds.cache.size} servers, in ${milliseconds / 1000} seconds`);

    //startWeb()

    let total = 0

    client.guilds.cache.each(guild => total += guild.memberCount)
    client.user.setActivity(`${total.toLocaleString()} members!`, { type: 'LISTENING' })


});

client.login(LECHSBOTTKEY);

exports.queue = client.queue