module.exports = {
    name: 'eval',
    aliases: ['runcmd', 'runcommand', 'runfunction'],
    description: '',
    ownerOnly: true,
    async execute(client, message, args, cmd, Discord) {
        const member = message.author
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
                let resultembed = new Discord.MessageEmbed()
                .setAuthor(`Succesfully`)
                .addField(`Entrys`, `\`\`\`js\n${args.join(" ")}\n\`\`\``)
                .addField(`Output`, `\`\`\`js\n${command}\n\`\`\``)
                .setTimestamp()
                message.channel.send({ embeds: [resultembed] })
                message.react('✅')
            } else {
                let resultembed = new Discord.MessageEmbed()
                .setAuthor(`Succesfully`)
                .addField(`Entrys`, `\`\`\`js\n${args.join(" ")}\n\`\`\``)
                .addField(`Output`, `\`\`\`js\n${require('util').inspect(command)}\n\`\`\``)
                .setTimestamp()
                message.channel.send({ embeds: [resultembed] })
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
    }
}