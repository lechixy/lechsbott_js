function roleColor(message){
    return message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
}

exports.roleColor = roleColor

function iroleColor(interaction){
    return interaction.guild.me.displayHexColor === "#000000" ? "#ffffff" : interaction.guild.me.displayHexColor
}

exports.iroleColor = iroleColor

function converToCode(string, type = '\n'){
    let stringsyntax = '\`\`\`'
    if(type){
        return `${stringsyntax}${type}\n${string}${stringsyntax}`
    } else {
        return `${stringsyntax}${string}${stringsyntax}`
    }
    
}

exports.converToCode = converToCode;

function firstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.firstLetter = firstLetter;