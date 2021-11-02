module.exports = {
    name: 'eval',
    aliases: ['evaldel'],
    description: '',
    ownerOnly: true,
    category: ['Owner'],
    async execute(client, message, args, cmd, Discord) {
        if(cmd === 'eval') {
            if(!args[0]) {
                let argsembed = new Discord.MessageEmbed()
                .setAuthor(`Logged in as owner`)
                .setDescription('Please type a **command line** for want run!')
                .setTimestamp()
                return message.channel.send({ embeds: [argsembed] })
            }
    
            try {
                let command = eval(args.join(" "));
                let willresults = ['string', 'boolean', 'number', 'float']
    
                if(willresults.includes(typeof command)){
                    message.react('✅')
                } else {
                    message.react('✅')
                }
    
            } catch(err){
                let errorembed = new Discord.MessageEmbed()
                .setAuthor(`An error occured`)
                .addField(`Entrys`, `\`\`\`js\n${args.join(" ")}\n\`\`\``)
                .addField(`Output`, `\`\`\`js\n${err}\n\`\`\``)
                .setColor('RED')
                .setTimestamp()
                message.channel.send({ embeds: [errorembed] })
                message.react('‼')
            }
        } else {
            if(!args[0]) {
                let argsembed = new Discord.MessageEmbed()
                .setAuthor(`Logged in as owner`)
                .setDescription('Please type a **command line** for want run!')
                .setTimestamp()
                return message.channel.send({ embeds: [argsembed] })
            }
    
            try {
                message.delete()
                let command = eval(args.join(" "));
                let willresults = ['string', 'boolean', 'number', 'float']
    
            } catch(err){
                let errorembed = new Discord.MessageEmbed()
                .setAuthor(`An error occured`)
                .addField(`Entrys`, `\`\`\`js\n${args.join(" ")}\n\`\`\``)
                .addField(`Output`, `\`\`\`js\n${err}\n\`\`\``)
                .setColor('RED')
                .setTimestamp()
                message.channel.send({ embeds: [errorembed] })
            }
        }

    }
}