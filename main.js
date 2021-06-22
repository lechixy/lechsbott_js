const Discord = require('discord.js');
const client = new Discord.Client({
    restTimeOffset: 0,
    disableEveryone: true
});
const dotenv = require('dotenv')

const memberCounter = require('./commands/counters/member-counter')
const { LECHSBOTTKEY } = require("./commands/util/lechsbottUtil");
// const database = require('./commands/util/database')
// const Tags = database();
const database = require("./commands/util/systemdatabase")
const Users = database();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord, Users);
})


client.on('ready', async () => {
    // Tags.sync();
    Users.sync();

    // const servers = [];
    // client.guilds.cache.forEach(async guild => {
    //     servers.push(guild.id)
    //     const tag = await Tags.findOne( { where: { guild_id: guild.id } } )
    //     if(tag == null){
    //         await Tags.create({ guild_id: guild.id });
    //     }
    // })

    // await Tags.findAll().then(g_list => {
    //     g_list.forEach(async guild_db =>{
    //         const db_id = guild_db.dataValues.guild_id;
    //         if(!servers.includes(db_id)){
    //             await Tags.destroy({where: {guild_id: db_id}})
    //         }
    //     })
    // })

    let actvs = [
        // `the ${client.users.cache.size} users!`,
        `just under development!`,
        `just under development!`,
    ];

    
    const index = Math.floor(Math.random() * (actvs.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    client.user.setActivity(actvs[index], { type: 'LISTENING' }); // sets bot's activities to one of the phrases in the arraylist.
});

client.login(LECHSBOTTKEY);