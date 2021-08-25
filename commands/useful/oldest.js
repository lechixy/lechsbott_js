const { PREFIX } = require(`../util/lechsbottUtil`)

const { MessageEmbed } = require(`discord.js`)
const moment = require(`moment`);

module.exports = {
    name:`oldest`,
    aliases: [`oldests`],
    description:`Diplays the oldest account in the server`,
    async execute(client, message, args, cmd, Discord) {
        
        if(cmd === `oldest`){
            let mem = message.guild.members.cache.filter(m => !m.user.bot).sort( (a,b) => a.user.createdAt - b.user.createdAt).first()

            const embed = new MessageEmbed()
            .setTitle(`Oldest member in ${message.guild.name}`)
            .setColor("RANDOM")
            .setDescription(`**${mem.user.username}** is the oldest member in **${message.guild.name}**\n**Acount Creation Date:** ${formatDate(mem.user.createdAt)}`)
            message.channel.send({ embeds: [embed] })
        } else {
            if(args[0] > 25){
                const embed = new Discord.MessageEmbed()
                .setDescription(`**You can look maximum 25 guild member**`)
                return message.channel.send({ embeds: [embed] });
            }

            let membercount
            if(!args[0]) membercount = 6
            else membercount = args[0]

            console.log(membercount)

            

            let mem = message.guild.members.cache.filter(m => !m.user.bot).sort( (a,b) => a.user.createdAt - b.user.createdAt).first(membercount)

            const arr = [];

            let numb = 1

            const embed = new MessageEmbed()
            .setTitle(`Oldest ${membercount} members in ${message.guild.name}`)
            .setColor("RANDOM")

            mem.forEach(m => {
                embed.addField(`${numb++}) ${m.user.username}`, `${formatDate(m.user.createdAt)}`, true)
            })

            message.channel.send({ embeds: [embed] })
        }
        
  }
}

function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", { dateStyle: 'medium', timeStyle: 'medium' }).format(date)
}
