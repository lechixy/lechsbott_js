module.exports = {
    name: 'aesthetics',
    description: 'Convert your awesome text to aesthetics font!',
    options: [
        {
            name: 'text',
            description: 'What will you convert to aesthetics text?',
            type: 'STRING',
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {

        const usermes = interaction.options.getString('text')
        
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
        
        const text = usermes.split('').map(letter => {

            if (characters[letter]) {
                return `${characters[letter]}`
            }
            return letter
        }).join('')

        interaction.followUp({ content: text })
        
 }
}