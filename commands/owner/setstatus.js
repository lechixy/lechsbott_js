const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name: 'setstatus',
    aliases: ['clientstatus'],
    ownerOnly: true,
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        let total = 0

        client.guilds.cache.each(guild => total += guild.memberCount)
    
        client.user.setActivity(`${total.toLocaleString()} members!`, { type: 'WATCHING' })
        
  }
}