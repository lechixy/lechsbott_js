module.exports = {
    name: 'dice',
    aliases: ['throwdice'],
    description: 'Throw a dice between 0 and given number',
    category: ['Fun'],
    arguments: `<max number to randomize>`,
    async execute(client, message, args, cmd, Discord) {
        if(!args[0]){
            let argslen = new Discord.MessageEmbed()
            .setDescription(`For throw a dice you need to define one thing: l!dice <how many faces>`)
            .setTimestamp()
            return message.channel.send({ embeds: [argslen] })
        }
        if(isNaN(args[0])){
            let numberembed = new Discord.MessageEmbed()
            .setAuthor(`Please type a real number!`, user.displayAvatarURL({dynamic: true}))
            return message.channel.send({ embeds: [numberembed] })
        }
        
        const hmf = args[0]
        const randomednumber = Math.floor(Math.random() * hmf+1)

        let resultembed = new Discord.MessageEmbed()
        .setDescription(`🎲 \`${message.author.username}\` rolled the **${hmf}-sided** dice **1** times: **${randomednumber}** came`)
        message.channel.send({ embeds: [resultembed] })
    }
}