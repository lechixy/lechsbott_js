const fs = require('fs');

module.exports = (client, Discord) =>{
    const load_dir = (dirs) =>{
        const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

        for(const file of command_files){
            const command = require(`../commands/${dirs}/${file}`);
            if(command.name){
                console.log(`CMD | ${command.name} loaded!`)
                client.commands.set(command.name, command);
            } else {
                continue;
            }
        }

        const command_files_main = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

        for(const file of command_files_main){
            const commandmain = require(`../commands/${file}`);
            if(commandmain.name){
                client.commands.set(commandmain.name, commandmain);
            } else {
                continue;
            }
        }
    }
    ['admin', 'beta','database', 'fun', 'guild','information', 'empty', 'music', 'owner', 'lechsbott', 'useful'].forEach(e => load_dir(e));
}