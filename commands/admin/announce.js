const { PREFIX } = require("../util/lechsbottUtil")

module.exports = {
    name:'announce',
    description:'',
    async execute(client, message, args, cmd, Discord) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`You are not able to use that!`, message.author.displayAvatarURL({dynamic: true}))
            .addField(`Require`, `\`\`\`Manage Messages\`\`\``, true)
            return message.channel.send(embed);
        }

        let mention;

        if(!args.length){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`You need to specify somethings for announce!`, message.author.displayAvatarURL({dynamic: true}))
            .addField(`Usage`, `${PREFIX}announce <#channel> <text>`, true)
            return message.channel.send(embed);
        }

        const channel = message.mentions.channels.first();

        if(!channel){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`You need to define a channel for announce!`, message.author.displayAvatarURL({dynamic: true}))
            .addField(`Usage`, `${PREFIX}announce <#channel> <text>`, true)
            return message.channel.send(embed);
        }

        if(!args[1]){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`You need to specify a message for announce!`, message.author.displayAvatarURL({dynamic: true}))
            .addField(`Usage`, `${PREFIX}announce <#channel> <text>`, true)
            return message.channel.send(embed);
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor(`📢 Announcement`, client.user.displayAvatarURL({dynamic: true}))
        .setDescription(args.slice(1).join(" "))
        channel.send(embed);
      
      
  }
}