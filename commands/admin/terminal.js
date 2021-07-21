const { PREFIX, OWNER1, OWNER2 } = require('../util/lechsbottUtil')
const child = require('child_process')

module.exports = {
    name:'terminal',
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        if(message.author.id !== OWNER1 || message.author.id !== OWNER2) return;
        
        const command = args.join(' ')

        if(!command){
            const embed = new Discord.MessageEmbed()
            .setDescription(`**You need to type a terminal command for execute!**`)
            return message.channel.send(embed);
        }

        child.exec(command, (err, res) => {
            if(err) return console.log(err)

            message.channel.send(res.slice(0, 2000), {code: 'js'})
        })
  }
}