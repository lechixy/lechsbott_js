const { PREFIX } = require('../util/lechsbottUtil')
const { roleColor } = require('../util/lechsbottFunctions')

module.exports = {
    name: 'guessthenumber',
    aliases: ['gtn', 'guess', 'guessnumber'],
    description: 'A simple game, you can try guess number!',
    category: ['Fun'],
    arguments: `<guess>`,
    async execute(client, message, args, cmd, Discord) {


        let max = 25
        let msg = await message.channel.send(
            `Guess a number from 1 to ${max} (You only have 50 seconds to guess the number)`
        );
        // Chances
        var chances = 9;
        // Some random number to guess
        var randomNum = Math.floor(Math.random() * max) + 1;

        // Filter
        const filter = (m) => m.member.user.id === message.author.id;
        // The collector
        const collector = message.channel.createMessageCollector({
            filter,
            time: 1000 * 50, // 50 Seconds btw.
        });

        collector.on("collect", async (msg) => {
            if (msg.content == randomNum) {
                msg.channel.send(
                    `**Congratulations ${msg.member.user.username}**\n*The number was ${randomNum}*`
                );
                collector.stop("Winner");
                // If the user send quit, then stop the collector
            } else if (msg.content == "quit") {
                msg.channel.send("You quitted from the game!");
                collector.stop("Stop collector");
            } else if (chances === 0) {
                msg.channel.send(
                    `**You ran out of chances try again later**\n*The number was ${randomNum}*`
                );
                collector.stop("Ran out of chances");
            } else if (msg.content < randomNum) {
                msg = msg.channel.send(`⬇️ Too low try again, pick a number again (chances: ${chances})`);
                chances--;
            } else if (msg.content > randomNum) {
                msg = msg.channel.send(`⬆️ Too high try again, pick a number again (chances: ${chances})`);
                chances--;
            } else {
                // If the content is like other types or smth.
                msg.channel.send("You can't send any other types, only guess a number or quit.")
            }
        });
    },
};