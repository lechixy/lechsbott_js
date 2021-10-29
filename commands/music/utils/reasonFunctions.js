function removeAndClear(queue, message){
    if(queue){

        const server_queue = queue.get(message.guild.id)

        server_queue.connection.removeAllListeners()
        server_queue.player.removeAllListeners()

        console.log('Removed listeners and queue')
        queue.delete(message.guild.id)
        return;
    }
}

exports.removeAndClear = removeAndClear;

function findTypeAndSend(content) {
    if (message.type !== 'APPLICATION_COMMAND') {
        return message.channel.send(content)
    } else {
        return message.followUp(content)
    }
}

exports.findTypeAndSend = findTypeAndSend;

function defineAuthor(msg, value) {
    if (msg.type !== 'APPLICATION_COMMAND') {
        let checkvalue = {
            "username": msg.author.username,
            "id": msg.author.id,
            "displayAvatarURL": msg.author.displayAvatarURL({ dynamic: true })
        }

        return checkvalue[value]
    } else {
        let checkvalue = {
            "username": msg.user.username,
            "id": msg.user.id,
            "displayAvatarURL": msg.user.displayAvatarURL({ dynamic: true })
        }

        return checkvalue[value]

    }
}

exports.defineAuthor = defineAuthor;