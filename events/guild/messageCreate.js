const cooldowns = new Map();
const { PREFIX, OWNER1, OWNER2 } = require("../../commands/util/lechsbottUtil")

module.exports = async (Discord, client, message) => {
    const prefix = PREFIX;

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || 
                    client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    // const udatabase = require('../../commands/util/systemdatabase')
    // const gdatabase = require('../../commands/util/guilddatabase')
    // const Users = udatabase();
    // const Guilds = gdatabase();

    try {
        if(command) {

            if(!cooldowns.has(command.name)){
                cooldowns.set(command.name, new Discord.Collection());
            }

            if(command.cooldown){
                const current_time = Date.now();
                const time_stamps = cooldowns.get(command.name);
                const cooldown_amount = (command.cooldown) * 1000;

                if(time_stamps.has(message.author.id)){
                    const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
            
                    if(current_time < expiration_time){
                        const time_left = (expiration_time - current_time) / 1000;

                        console.log(`${message.author.tag} used ${PREFIX}${command.name} many times and catched to ${time_left.toFixed(1)}s cooldown`)

                        let embed = new Discord.MessageEmbed()
                        .setDescription(`**You are on cooldown for**  \`${time_left.toFixed(1)}s\``)
                        return message.channel.send({ embeds: [embed] })
                    }
                }
        
                //If the author's id is not in time_stamps then add them with the current time.
                time_stamps.set(message.author.id, current_time);
                //Delete the user's id once the cooldown is over.
                setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
            }
            if(command.ownerOnly === true) {

                if(message.author.id !== OWNER2){
                    return console.log(`${message.author.tag} tried use an owner command!`)
                }
                if(message.author.id === OWNER2) {
                    console.log(`${message.author.tag} used an owner command ${cmd} in ${message.guild.name}`)
    
                    return command.execute(client, message, args, cmd, Discord)
                }
            }

            command.execute(client, message, args, cmd, Discord)

            console.log(`${message.author.tag} has used ${PREFIX}${cmd} in ${message.guild.name}`)
        }
    } catch (err) {
        let errembed = new Discord.MessageEmbed()
        .setDescription('There was an error trying to execute this command!')
        message.channel.send({ embeds: [errembed] })
        console.log(err)
    }
    
}