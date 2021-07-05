// const cooldowns = new Map();


module.exports = async (Discord, client, message) => {
    if(message.channel.type === 'dm') return;
    const prefix = 'l!';
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || 
                    client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    const udatabase = require('../../commands/util/systemdatabase')
    const gdatabase = require('../../commands/util/guilddatabase')
    const { OWNER1 } = require("../../commands/util/lechsbottUtil");
    const { OWNER2 } = require("../../commands/util/lechsbottUtil");
    const Users = udatabase();
    const Guilds = gdatabase();

    // if(!cooldowns.has(command.name)){
    //     cooldowns.set(command.name, new Discord.Collection());
    // }

    // const current_time = Date.now();
    // const time_stamps = cooldowns.get(command.name);
    // const cooldown_amount = (command.cooldown) * 1000;

    // //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    // if(!message.author.id === OWNER1 || message.author.id === OWNER2) {
    //     if(time_stamps.has(message.author.id)){
    //         const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
    
    //         if(current_time < expiration_time){
    //             const time_left = (expiration_time - current_time) / 1000;
    
    //             let warnembed = new Discord.MessageEmbed()
    //             .setAuthor(`Please wait ${time_left.toFixed(1)} more seconds before using ${message.content}`, message.author.displayAvatarURL())
    //             return message.channel.send(warnembed)
    //         }
    //     }

    //         //If the author's id is not in time_stamps then add them with the current time.
    //     time_stamps.set(message.author.id, current_time);
    //     //Delete the user's id once the cooldown is over.
    //     setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    // }

    try {
        if(command) command.execute(client, message, args, cmd, Discord, Users, Guilds)
    } catch (err) {
        let errembed = new Discord.MessageEmbed()
        .setDescription('There was an error trying to execute this command!')
        message.channel.send(errembed)
        console.log(err)
    }
    
}