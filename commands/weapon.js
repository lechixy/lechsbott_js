module.exports = {
    name: "weaponize",
    aliases: ['ak47', 'minigun', 'awp'],
    cooldown: 0,
    description: "welcome to the lab",
    async execute(client, message, args, cmd, Discord){
        if(cmd === 'weaponize') {

            let botpp = client.user.displayAvatarURL()

            let mainembed = new Discord.MessageEmbed()
            .setAuthor('Who want some weaponize??', `${botpp}`)
            .setDescription('Current weapons is below react one of them and learn how use it!')
            .addField('\u200B', '\u200B')
            .addField('AK-47', '\`react to select\`', true)
            .addField('MINIGUN', '\`react to select\`', true)
            .setTimestamp()
            const m = await message.channel.send(mainembed);
            m.react('🔫')
            m.react('🏹')

            client.on('messageReactionAdd', async (reaction, user) => {
                let channel = message.channel.id
                
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === '🔫'){
                        let botpp = client.user.displayAvatarURL()

                        let ak47embed = new Discord.MessageEmbed()
                        .setAuthor('For AK-47', `${botpp}`)
                        .setDescription('If u want to shoot one use l!ak47 \`<tag a person>\`')
                        .setTimestamp()
                        m.edit(ak47embed)
                    }
                    if (reaction.emoji.name === '🏹'){
                        let botpp = client.user.displayAvatarURL()

                        let miniembed = new Discord.MessageEmbed()
                        .setAuthor('For MINIGUN', `${botpp}`)
                        .setDescription('If u want to shoot one use l!minigun \`<tag a person>\`')
                        .setTimestamp()
                        m.edit(miniembed)
                    }
                } else {
                    return;
                }

            });

            client.on('messageReactionRemove', async (reaction, user) => {
                let channel = message.channel.id

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
     
     
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === '🔫'){
                        let mainembed = new Discord.MessageEmbed()
                        .setAuthor('Who want some weaponize??', `${botpp}`)
                        .setDescription('Current weapons is below react one of them and learn how use it!')
                        .addField('\u200B', '\u200B')
                        .addField('AK-47', '\`react 🔫\`', true)
                        .addField('MINIGUN', '\`react 🏹\`', true)
                        .setTimestamp()
                        m.edit(mainembed)
                    }
                    if (reaction.emoji.name === '🏹'){
                        let mainembed = new Discord.MessageEmbed()
                        .setAuthor('Who want some weaponize??', `${botpp}`)
                        .setDescription('Current weapons is below react one of them and learn how use it!')
                        .addField('\u200B', '\u200B')
                        .addField('AK-47', '\`react 🔫\`', true)
                        .addField('MINIGUN', '\`react 🏹\`', true)
                        .setTimestamp()
                        m.edit(mainembed)
                    }
                } else {
                    return;
                }
            });

        } else if(cmd === 'ak47') {

            if (!args[0]) return message.channel.send('You need to tag someone to shoot him! \`l!ak47 <tag someone>\` ');

            const member = message.mentions.users.first();

            let ak47shootembed = new Discord.MessageEmbed()
            .setDescription(`\`${message.author.username}\` <:ak1:849327705773703230><:ak2:849327705756794911><:ak3:849327706155778058><a:ak4:849327706219085860> \`${member.username}\``)
            message.channel.send(ak47shootembed)
        } else if(cmd === 'minigun') {

            if (!args[0]) return message.channel.send('You need to tag someone to shoot him! \`l!minigun <tag someone>\` ');

            const member = message.mentions.users.first();

            let minishootembed = new Discord.MessageEmbed()
            .setDescription(`\`${message.author.username}\` <a:mini1:849327707888418896><a:mini2:849327710387306536><a:mini3:849327710005231627><a:mini4:849327711213060136> \`${member.username}\``)
            message.channel.send(minishootembed)
        } else if(cmd === 'awp') {
            if (!args[0]) return message.channel.send('You need to tag someone to shoot him! \`l!minigun <tag someone>\` ');

            const member = message.mentions.users.first();

            let awpshootembed = new Discord.MessageEmbed()
            .setDescription(`\`${message.author.username}\` <a:mini1:849327707888418896><a:mini2:849327710387306536><a:mini3:849327710005231627><a:mini4:849327711213060136> \`${member.username}\``)
            message.channel.send(awpshootembed)
        }
    }
}