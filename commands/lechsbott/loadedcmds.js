const { PREFIX } = require('../util/lechsbottUtil')
const fs = require('fs')

module.exports = {
    name:'loadedcommands',
    aliases: ['loadedcmds'],
    description:'',
    async execute(client, message, args, cmd, Discord) {

        let result = []

        const roleColor =
        message.guild.me.displayHexColor === "#000000"
            ? "#ffffff"
            : message.guild.me.displayHexColor;

        const look_dir = (dirs) =>{
            const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

            for(const file of command_files){
                const command = require(`../${dirs}/${file}`);
                if(command.name){
                    result.push(`\`${command.name}\``)
                } else {
                    continue;
                }
            }
        }
        
        ['admin', 'beta','database', 'fun', 'guild','information', 'empty', 'music', 'owner', 'lechsbott', 'useful'].forEach(e => look_dir(e));
  
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${result.length} | List of loaded commands`, client.user.displayAvatarURL({dynamic: true}))
        .setColor(roleColor)
        .setDescription(result.join(' **•** '))
        message.channel.send({ embeds: [embed] })

    }
}