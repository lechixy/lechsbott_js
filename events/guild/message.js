// const cooldowns = new Map();


module.exports = (Discord, client, message) => {
    const prefix = 'l!';
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || 
                    client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    // if(!cooldowns.has(command.name)){
    //     cooldowns.set(command.name, new Discord.Collection());
    // }

    // const current_time = Date.now();
    // const time_stamps = cooldowns.get(command.name);
    // const cooldown_amount = (command.cooldown) * 1000;

    // if(time_stamps.has(message.author.id)){
    //     const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

    //     if(current_time < expiration_time){
    //         const time_left = (expiration_time - current_time) / 1000;

    //         let timeleftedembed = new Discord.MessageEmbed()
    //         .setDescription(`Please type slowly for \`${command.name}\` command...
    //         There is a **wild cooldown** watching you time to finish it \`${time_left.toFixed(1)}\` seconds!`)
    //         return message.channel.send(timeleftedembed)
    //     }
    // }

    // time_stamps.set(message.author.id, current_time)
    // setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    try {
        if(command) command.execute(client, message, args, cmd, Discord)
    } catch (err) {
        let errembed = new Discord.MessageEmbed()
        .setDescription('There was an error trying to execute this command!')
        message.channel.send(errembed)
        console.log(err)
    }
    
}
