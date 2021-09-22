const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'emojify',
    aliases:['textemoji'],
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        if(!args.length) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`You need to type a query to convert emojify!`)
            return message.channel.send(embed);
        }
        
        const specialcodes = {
            "0": ":zero:",
            "1": ":one:",
            "2": ":two:",
            "3": ":three:",
            "4": ":four:",
            "5": ":fix:",
            "6": ":six:",
            "7": ":seven:",
            "8": ":eight:",
            "9": ":nine:",
            "#": ":hash:",
            "*": ":asterisk:",
            "?": ":grey_question:",
            "!": ":grey_exclamation:",
        }
        
        const text = args.join(" ").toLowerCase().split('').map(letter => {
            if(/[a-z]/g.test(letter)){
                return `:regional_indicator_${letter}:`
            } else if (specialcodes[letter]) {
                return `${specialcodes[letter]}`
            }
            return letter
        }).join('')

        message.channel.send({ content: text })
  }
}