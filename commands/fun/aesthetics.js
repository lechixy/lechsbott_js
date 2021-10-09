const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name:'aesthetics',
    description:'Convert your text to a beautiful message',
    category: ['Fun'],
    async execute(client, message, args, cmd, Discord) {

        if(!args[0]){
            const embed = new Discord.MessageEmbed()
            .setColor(roleColor(message))
            .setAuthor(`What will you convert to aesthetics text?`, message.author.displayAvatarURL({dynamic: true}))
            .addField(`Usage`, `${PREFIX}${cmd} **<text>**`, true)
            return message.channel.send({ embeds: [embed] });
        }

        const characters = {
            "a": "ａ",
            "b": "ｂ",
            "c": "ｃ",
            "d": "ｄ",
            "e": "ｅ",
            "f": "ｆ",
            "g": "ｇ",
            "h": "ｈ",
            "i": "ｉ",
            "j": "ｊ",         
            "k": "ｋ",
            "l": "ｌ",
            "m": "ｍ",
            "n": "ｎ",
            "o": "ｏ",
            "p": "ｐ",
            "r": "ｒ",
            "s": "ｓ",
            "t": "ｔ",
            "u": "ｕ",
            "v": "ｖ",
            "y": "ｙ",
            "z": "ｚ",
            "q": "ｑ",
            "w": "ｗ",
            "x": "ｘ",
            ".": "．",
            "A": "Ａ",
            "B": "Ｂ",
            "C": "Ｃ",
            "D": "Ｄ",
            "E": "Ｅ",
            "F": "Ｆ",
            "G": "Ｇ",
            "H": "Ｈ",
            "I": "Ｉ",
            "J": "Ｊ",
            "K": "Ｋ",
            "L": "Ｌ",
            "M": "Ｍ",
            "N": "Ｎ",
            "O": "Ｏ",
            "P": "Ｐ",
            "R": "Ｒ",
            "S": "Ｓ",
            "T": "Ｔ",
            "U": "Ｕ",
            "V": "Ｖ",
            "Y": "Ｙ",
            "Z": "Ｚ",
            "Q": "Ｑ",
            "W": "Ｗ",
            "X": "Ｘ",
            "@": "＠",
            "!": "！",
            ",": "，",
            "-": "－",
            "?": "？",
            "/": "／",
            "*": "＊",
            '"': "＂",
            "<": "＜",
            ">": "＞",
            ":": "：",
            ")": "）",
            "(": "（",
        }
        
        const text = args.join(" ").split('').map(letter => {

            if (characters[letter]) {
                return `${characters[letter]}`
            }
            return letter
        }).join('')

        message.channel.send({ content: text })
        
        
  }
}