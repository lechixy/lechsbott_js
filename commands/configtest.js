module.exports = {
    name: 'configtest',
    description: 'asdagda',
    async execute(client, message, args, cmd, Discord) {
        const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, DEFAULT_VOLUME } = require("../util/lechsbottUtil");

        message.channel.send(YOUTUBE_API_KEY)
    }
}