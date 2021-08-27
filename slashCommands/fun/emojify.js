module.exports = {
    name: 'emojify',
    description: 'Convert your text to beatiful emojis!',
    options: [
        {
            name: 'text',
            type: 'STRING',
            description: 'Text to will convert to emoji',
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {
        
        const input = args;

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
            "ğ": ":regional_indicator_g:",
            "ç": ":regional_indicator_c:",
            "ş": ":regional_indicator_s:",
            "ü": ":regional_indicator_u:",
            "İ": ":regional_indicator_i:",
            "ı": ":regional_indicator_i:",
        }
        
        const text = input.join(" ").toLowerCase().split('').map(letter => {
            if(/[a-z]/g.test(letter)){
                return `:regional_indicator_${letter}:`
            } else if (specialcodes[letter]) {
                return `${specialcodes[letter]}`
            }
            return letter
        }).join('')

        interaction.followUp(text)
        
        
 }
}