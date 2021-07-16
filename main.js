const Discord = require('discord.js');
const client = new Discord.Client({
    restTimeOffset: 0,
    disableEveryone: true
});
require("discord-buttons")(client);

// const memberCounter = require('./commands/counters/member-counter')
const { PREFIX ,LECHSBOTTKEY } = require("./commands/util/lechsbottUtil");
// const udatabase = require("./commands/util/systemdatabase")
// const gdatabase = require("./commands/util/guilddatabase")
// const Users = udatabase();
// const Guilds = gdatabase();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler', 'event_handler'].forEach(handler => {
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
    //     `the ${client.users.cache.size} users!`,
    //     `${PREFIX} to make something!`,
    //     `${PREFIX} to be helpful!`,
    //     `about sc support`,
    // ];

    
    // const index = Math.floor(Math.random() * (actvs.length - 1) + 1);
    // setInterval(function(){
        client.user.setActivity('now supporting sc!'/*actvs[index]*/, { type: 'LISTENING' });
    // }, 60000)
});

client.login(LECHSBOTTKEY);