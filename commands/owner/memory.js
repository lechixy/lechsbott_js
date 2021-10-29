const { PREFIX, OWNERS } = require('../util/lechsbottUtil')
const { converToCode } = require('../util/lechsbottFunctions')
const chalk = require('chalk')

module.exports = {
    name: 'memory',
    aliases: ['checkmemory', 'mem'],
    ownerOnly: true,
    category: ['Owner'],
    async execute(client, message, args, cmd, Discord) {

        let mem = `Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB/${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS`

        console.log(chalk.yellowBright(`${mem}`))
        message.channel.send({ content: `${converToCode(mem)}` })

    }
}