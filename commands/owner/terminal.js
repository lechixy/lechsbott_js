const child = require('child_process')

module.exports = {
    name:'terminal',
    description:'',
    ownerOnly: true,
    async execute(client, message, args, cmd, Discord) {
        const command = args.join(' ')

        if(!command){
            const embed = new Discord.MessageEmbed()
            .setDescription(`**You need to type a terminal command for execute!**`)
            return message.channel.send({embeds: [embed] });
        }

        child.exec(command, (err, res) => {
            if(err) return console.log(err)

            message.channel.send(res.slice(0, 2000), {code: 'js'})
        })
  }
}