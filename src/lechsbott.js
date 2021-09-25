const Discord = require('discord.js')

function lechsbott(message, client) {

    let user = message.mentions.members.first()

    if (message.mentions.members.first() && user.id === `${client.user.id}`) {
        message.reply({ content: `Hey there, use my prefix \`l!\` to interact with me :)` });
    }
}

exports.lechsbott = lechsbott;