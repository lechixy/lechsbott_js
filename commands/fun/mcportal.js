module.exports = {
    name: 'minecraftportal',
    description: 'a mc portal',
    async execute(client, message, args, cmd, Discord) {
        const portalemoji = client.emojis.cache.get('853734837075574834');
        const obsidianemoji = client.emojis.cache.get('853734835491438633');

        message.channel
            .send(`${obsidianemoji}${obsidianemoji}${obsidianemoji}${obsidianemoji}\n${obsidianemoji}${portalemoji}${portalemoji}${obsidianemoji}\n${obsidianemoji}${portalemoji}${portalemoji}${obsidianemoji}\n${obsidianemoji}${portalemoji}${portalemoji}${obsidianemoji}\n${obsidianemoji}${obsidianemoji}${obsidianemoji}${obsidianemoji}`)  
    }
}