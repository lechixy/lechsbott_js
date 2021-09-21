const Voice = require("@discordjs/voice")
const { getVoiceConnection } = Voice;

module.exports = {
    name: 'test',
    description: '',
    async execute(client, message, args, cmd, Discord) {

        const log = getVoiceConnection(message.guild.id)
        
        console.log(log.ping)
    }
}