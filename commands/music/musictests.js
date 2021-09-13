const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name:'musictests',
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        const queue = client.queue
        const server_queue = queue.get(message.guild.id)
        
        console.log(server_queue)
        
  }
}