function roleColor(message){
    return message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
}

exports.roleColor = roleColor

function iroleColor(interaction){
    return interaction.guild.me.displayHexColor === "#000000" ? "#ffffff" : interaction.guild.me.displayHexColor
}

exports.iroleColor = iroleColor