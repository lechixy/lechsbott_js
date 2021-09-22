const Discord = require('discord.js')

function lechsbott(message, client) {

    let user = message.mentions.members.first()

    if (message.mentions.members.first() && user.id === `${client.user.id}`) {
        message.reply({ content: `> **Hey <@${message.author.id}> if you want to interact with me, my prefix is here** \`l!\`` });
    }
}

exports.lechsbott = lechsbott;