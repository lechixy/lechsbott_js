const { Command } = require('../../lechs_modules/Command/index')

module.exports = new Command({
   name: "remove",
   description: "Removes selected song from queue",
   aliases: ["rmv",],
   arguments: "<song queue number>",
   category: ["Music"],
   async execute(client, args, cmd, Discord){

}
})
