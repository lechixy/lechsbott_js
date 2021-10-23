async function confirmation(message, author, validReactions, time = 60000) {

    for (const reaction of validReactions) await message.react(reaction)

    const filter = (reaction, user) => {
        return validReactions.includes(reaction.emoji.name) && user.id === author.id
    }

    return message
        .awaitReactions({ time: time })
        .then((collected) => console.log(collected));
}

exports.confirmation = confirmation;
