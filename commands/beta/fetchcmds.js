const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'fixcmd',
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        const guildId = '840543133007609907'

        const getApp = (guildId) => {
            const app = client.api.applications(client.user.id)
            if(guildId) {
                app.guilds(guildId)
            }
            return app
        }

        const commands = await getApp(guildId).commands.get()
        console.log(commands)
        
        
        
        
  }
}