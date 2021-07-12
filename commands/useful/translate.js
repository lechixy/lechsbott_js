const translate = require("@iamtraction/google-translate")

module.exports = {
    name: 'translate',
    aliases: ['translateto'],
    description: 'Translate command!',
    async execute(client, message, args, cmd, Discord) {
        if(cmd === 'translate') {
            const query = args.join(' ');

            if(!query){
                let queryembed = new Discord.MessageEmbed()
                .setDescription(`You need to type a text for translate!`)
                .addField(`Usage`, `l!translate <text>`)
                return message.channel.send(queryembed)
            }
            
            const translated = await translate(query, { to: 'en' });

            let translatedembed = new Discord.MessageEmbed()
            .setDescription(translated.text)
            message.channel.send(translatedembed)
        }
        else if(cmd === 'translateto'){
            const query = message.content.slice(17, message.content.length)

            if(!query){
                let queryembed = new Discord.MessageEmbed()
                .setDescription(`You need to type a text for translate!`)
                .addField(`Usage`, `l!translateto <language code> <text>`)
                return message.channel.send(queryembed)
            }
            if(!args[0]){
                let langcodeembed = new Discord.MessageEmbed()
                .setDescription(`You need to type a valid lang code! Translate uses ISO 639-1 language code system, you will find a language code with ISO 639-1`)
                .addField(`Usage`, `l!translateto <language code> <text>`)
                return message.channel.send(langcodeembed)
            }
            
            try {
                const translated = await translate(query, { to: args[0] });

                let translatedembed = new Discord.MessageEmbed()
                .setDescription(translated.text)
                message.channel.send(translatedembed)
            } catch(err) {
                let errembed = new Discord.MessageEmbed()
                .setDescription(`**${err}**`)
                return message.channel.send(errembed)
            }

        }

    }
}