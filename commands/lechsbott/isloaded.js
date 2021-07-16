const { PREFIX } = require('../util/lechsbottUtil')
const fs = require('fs')

module.exports = {
    name:'isloaded',
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        if(!args[0]){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Please specify a command!`, message.author.displayAvatarURL({dynamic: true}))
            return message.channel.send(embed);
        }
        
        const roleColor =
        message.guild.me.displayHexColor === "#000000"
            ? "#ffffff"
            : message.guild.me.displayHexColor;

        const result = []

        const look_dir = (dirs) =>{
            const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

            for(const file of command_files){
                const command = require(`../${dirs}/${file}`);
                if(command.name){
                    result.push(`${command.name}`)
                } else {
                    continue;
                }
            }
        }
        
        ['admin', 'beta','database', 'fun', 'guild','information', 'empty', 'music', 'owner', 'lechsbott', 'useful'].forEach(e => look_dir(e));
        
        const findtool = result.find(search => search === `${args[0]}`)

        if(!findtool){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`There is no loaded command with ${args[0]} name`, message.author.displayAvatarURL({dynamic: true}))
            .setColor('#B60000')
            return message.channel.send(embed);
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${args[0]} is available in commands!`, message.author.displayAvatarURL({dynamic: true}))
        .addField(`Status`, `Loaded successfully`, true)
        .setColor('#0FB100')
        message.channel.send(embed);
        
  }
}