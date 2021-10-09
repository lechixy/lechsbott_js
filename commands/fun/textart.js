const { PREFIX } = require('../util/lechsbottUtil')
const figlet = require('figlet')

module.exports = {
    name:'textart',
    aliases:['text-art', 'ascii'],
    description:'Converts text to ascii',
    category: ['Fun'],
    async execute(client, message, args, cmd, Discord) {
        
        figlet.text(args.join(" "), {
            font: "",
        }, async(err, data) => {
            message.channel.send({ content: `\`\`\`${data}\`\`\`` })
        })
        
        
  }
}