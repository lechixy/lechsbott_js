module.exports = async (client, message, args) =>{
    const guild = client.guilds.cache.get('840543133007609907');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('840590912173506620');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
    }, 5000);
}