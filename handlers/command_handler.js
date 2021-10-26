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
    }
    ['Moderation', 'fun', 'guild', 'user', 'information', 'music', 'owner', 'social', 'lechsbott', 'Utility'].forEach(e => load_dir(e));
}