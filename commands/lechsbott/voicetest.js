const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'voicetest',
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        message.guild.me.voice.serverDeaf(true)
        
        
  }
}