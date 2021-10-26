const { PREFIX } = require('../util/lechsbottUtil')
const si = require('systeminformation')

module.exports = {
    name:'memory',
    aliases:['checkmemory', 'mem'],
    ownerOnly: true,
    category: ['Owner'],
    async execute(client, message, args, cmd, Discord) {
            
        let mem = await si.mem();
		let ram = mem.available - mem.swaptotal;
		console.log("CURRENT RAM: "+(ram/(1024*1024*1024))+"G");
        
        
  }
}