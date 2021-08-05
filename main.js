const Discord = require('discord.js');
const { Client, Intents } = require('discord.js')
const client = new Client({
    restTimeOffset: 0,
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
})

// const memberCounter = require('./commands/counters/member-counter')
const { LECHSBOTTKEY } = require("./commands/util/lechsbottUtil");
// const udatabase = require("./commands/util/systemdatabase")
// const gdatabase = require("./commands/util/guilddatabase")
// const Users = udatabase();
// const Guilds = gdatabase();

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler', 'slash_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.on('ready', async () => {
    // Users.sync();
    // Guilds.sync();

    // const servers = [];
    // client.guilds.cache.forEach(async guild => {
    //     servers.push(guild.id)
    //     const tag = await Guilds.findOne( { where: { guild_id: guild.id } } )
    //     if(tag == null){
    //         await Guilds.create({ guild_id: guild.id });
    //     }
    // })

    // await Guilds.findAll().then(g_list => {
    //     g_list.forEach(async guild_db =>{
    //         const db_id = guild_db.dataValues.guild_id;
    //         if(!servers.includes(db_id)){
    //             await Guilds.destroy({where: {guild_id: db_id}})
    //         }
    //     })
    // })

    // let actvs = [
    //     `${client.users.cache.size} users!`,
    //     `${PREFIX} make something!`,
    //     `about sc support`,
    //     `${PREFIX} be helpful!`,
    //     `adding lovely stuff!`,
    // ];

    
    //  const index = Math.floor(Math.random() * (actvs.length - 1) + 1);
    //  setInterval(function(){
        client.user.setActivity('your lovely command!', { type: 'LISTENING' });
    //  }, 60000)
});

client.login(LECHSBOTTKEY);
